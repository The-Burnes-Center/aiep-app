from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .tasks import long_running_task
from celery.result import AsyncResult
from .auth import router as auth_router

app = FastAPI(root_path='/api')

# Configure CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])

class TaskParams(BaseModel):
    param: str

@app.post("/enqueue")
def enqueue_task(params: TaskParams):
    task = long_running_task.delay(params.param)
    return {"task_id": task.id}

@app.get("/status/{task_id}")
def get_status(task_id: str):
    task_result = AsyncResult(task_id)
    return {"task_id": task_id, "status": task_result.state, "result": task_result.result if task_result.ready() else None}