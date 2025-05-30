from fastapi import APIRouter
from ..services.embeddings import EmbeddingsService
from ..services.gemini_service import GeminiService

router = APIRouter()
embeddings_service = EmbeddingsService()
gemini_service = GeminiService()

@router.get("/")
async def health_check():
    """Check the health of the service and its dependencies."""
    try:
        # Check Pinecone connection
        pinecone_status = "healthy"
        try:
            embeddings_service.index.describe_index_stats()
        except Exception as e:
            pinecone_status = f"unhealthy: {str(e)}"
        
        # Check Gemini connection
        gemini_status = "healthy"
        try:
            await gemini_service.generate_response("Test connection")
        except Exception as e:
            gemini_status = f"unhealthy: {str(e)}"
        
        return {
            "status": "healthy",
            "components": {
                "pinecone": pinecone_status,
                "gemini": gemini_status
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        } 