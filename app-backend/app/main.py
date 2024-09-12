from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import router as auth_router
from .test import router as test_router
from .jobs import router as jobs_router
from .rag import router as rag_router

app = FastAPI(root_path='/api')

# Allow CORS for frontend application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the auth router
app.include_router(auth_router, prefix="/auth", tags=["User Authentication"])
app.include_router(test_router, prefix="/test", tags=["Internal Testing"])
app.include_router(jobs_router, prefix="/jobs", tags=["Processing Jobs"])
app.include_router(rag_router, prefix="/rag", tags=["Retreival Augmented Generation Functionalities"])

