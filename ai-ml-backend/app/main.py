from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional
import uvicorn

from .routers import documents, auth, health
from .core.config import settings
from .core.security import verify_token

app = FastAPI(
    title="AI Legal Assistant API",
    description="API for AI-powered legal document processing and analysis",
    version="1.0.0",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(health.router, prefix="/health", tags=["Health"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Legal Assistant API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 