import requests, base64, mimetypes
from fastapi import FastAPI, APIRouter, UploadFile, File, Depends, HTTPException, Request
from pydantic import BaseModel

from typing import List, Dict

from .auth import get_current_user
from .celery_config import process_job

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
        file_data.append({"filename": file.filename, "content": base64.b64encode(file_content).decode('utf-8'), "mime_type": mime_type})

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

