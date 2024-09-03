from io import BytesIO
from pdf2image import convert_from_bytes
import requests, base64, mimetypes, uuid
from fastapi import FastAPI, APIRouter, UploadFile, File, Depends, HTTPException, Request, BackgroundTasks
from pydantic import BaseModel
from fastembed.embedding import DefaultEmbedding
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct

from typing import List, Dict

from .extract import extract_from_iep
from .auth import get_current_user
from .celery_config import celery_app

app = FastAPI()
router = APIRouter()

class Job(BaseModel):
    id: str
    user: str
    status: str
    files: List[Dict[str, str]]

class JobCreate(BaseModel):
    status: str = "started"
    files: List[str]

@router.post("/create", dependencies=[Depends(get_current_user)])
async def create_job(
    request: Request,
    files: List[UploadFile] = File(...),
    user: dict = Depends(get_current_user)
):  
    media_ids, file_data = [], []
    token = request.cookies.get("payload-token")
    for file in files:
        file_content = await file.read()
        mime_type = mimetypes.guess_type(file.filename)[0] or "application/octet-stream"
        file_data.append({"filename": file.filename, "content": file_content, "mime_type": mime_type})

        response = requests.post(
            "http://app-admin:3000/cms/api/media",
            headers={"Authorization": f"Bearer {token}"},
            files={"file": (file.filename, file_content, mime_type)},
        )
        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail="File upload failed")
        
        media_ids.append(response.json()["doc"]["id"])

    job_payload = {
        "user": user["user"]["id"],
        "files": [{"file": media_id} for media_id in media_ids],
        "status": "started",
        "resultData": None
    }

    job_response = requests.post(
        "http://app-admin:3000/cms/api/jobs",
        json=job_payload,
        headers={"Authorization": f"Bearer {token}"},
    )

    if job_response.status_code != 201:
        raise HTTPException(status_code=job_response.status_code, detail="Job creation failed")
    
    job_id = job_response.json()['doc']['id']

    # Trigger the Celery task asynchronously
    process_job.delay(file_data, job_id, token)

    # Immediately return a response to the client
    return {"job_id": job_id, "status": "Job started, processing in background"}

@celery_app.task
def process_job(file_data: bytes, job_id: str, token: str):
    base64_images = []
    for file_bytes in file_data:
        filename = file_bytes['filename']
        content = file_bytes['content']
        
        if filename.endswith('.pdf'):
            images = convert_from_bytes(content)
            for image in images:
                buffered = BytesIO()
                image.save(buffered, format="PNG")
                buffered.seek(0)
                # Convert bytes to base64
                base64_image = base64.b64encode(buffered.read()).decode('utf-8')
                base64_images.append(base64_image)
        
        elif filename.endswith(('.jpg', '.jpeg', '.png')):
            base64_images.append(base64.b64encode(content).decode('utf-8'))
            
    results_dict, chunks_dict = extract_from_iep(base64_images)

    # Initialize Qdrant Collection
    collection_name=f'job_{job_id}'
    fastembed_model = DefaultEmbedding()
    fast_embeddings = fastembed_model.embed(chunks_dict.values())
    qdrant_client = QdrantClient(url='http://qdrant:6333')
    vector_param = VectorParams(size=384, distance=Distance.DOT)
    qdrant_client.create_collection(collection_name=collection_name, vectors_config=vector_param)
    # Prepare points with IDs
    points = [
        PointStruct(id=str(uuid.uuid4()), vector=vector, payload={"original_id": chunk_id, "text": chunk})
        for vector, (chunk_id, chunk) in zip(fast_embeddings, chunks_dict.items())
    ]
    # Insert points into the collection using the upsert method
    qdrant_client.upsert(collection_name=collection_name, points=points)

    # Update the job status with the result
    response = requests.patch(
        f"http://app-admin:3000/cms/api/jobs/{job_id}",
        headers={"Authorization": f"Bearer {token}"},
        json={"status": "completed", "resultData": {'Result': results_dict}},
    )
    
    if response.status_code != 200:
        raise Exception("Failed to update job status")

@router.get("/get-all", dependencies=[Depends(get_current_user)])
async def get_user_jobs(
    request: Request, 
    user: dict = Depends(get_current_user)
):
    token = request.cookies.get("payload-token")
    user_id = user["user"]["id"]

    response = requests.get(
        f"http://app-admin:3000/cms/api/jobs?where[user][equals]={user_id}",
        headers={"Authorization": f"Bearer {token}"},
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch jobs")

    return response.json()['docs']

app.include_router(router)

