from celery import Celery
import os, base64, requests, uuid
from pdf2image import convert_from_bytes
from io import BytesIO

from .extract import extract_from_iep
from fastembed.embedding import DefaultEmbedding
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct

CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')

celery_app = Celery('app', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

@celery_app.task(name="process_job")
def process_job(file_data: dict, job_id: str, token: str):
    base64_images = []
    for file_bytes in file_data:
        filename = file_bytes['filename']
        content = base64.b64decode(file_bytes['content'].encode('utf-8'))
        
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