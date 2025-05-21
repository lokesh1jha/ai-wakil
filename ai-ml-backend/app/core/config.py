from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/v1"
    PROJECT_NAME: str = "AI Legal Assistant"
    
    # Security
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: List[str] = ["*"]
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Pinecone
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    PINECONE_ENVIRONMENT: str = os.getenv("PINECONE_ENVIRONMENT", "")
    PINECONE_INDEX_NAME: str = "legal-documents"
    
    # Document Processing
    MAX_DOCUMENT_SIZE_MB: int = 10
    SUPPORTED_DOCUMENT_TYPES: List[str] = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    
    # LLM Settings
    DEFAULT_MODEL: str = "gpt-4"
    EMBEDDING_MODEL: str = "text-embedding-ada-002"
    
    class Config:
        case_sensitive = True

settings = Settings() 