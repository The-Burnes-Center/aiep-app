from fastapi import APIRouter, Depends, HTTPException, Response, Request
import requests
from qdrant_client import QdrantClient
from fastembed.embedding import DefaultEmbedding

router = APIRouter()

@router.post("/doc-search")
async def signup(job_id: str, query_text: str, limit: int=50, score_threshold:float=0.5):
    try:
        collection_name = f"job_{job_id}"
        qdrant_client = QdrantClient(url='http://qdrant:6333')
        fastembed_model = DefaultEmbedding()
        fast_embeddings = fastembed_model.embed([query_text])
        query_vector = next(fast_embeddings)

        search_result = qdrant_client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=limit,
            with_payload=True
        )
        # Filter the results based on the score threshold
        filtered_results = [result for result in search_result if result.score >= score_threshold]
        return filtered_results
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))