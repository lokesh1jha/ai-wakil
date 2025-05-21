from fastapi import APIRouter
from ..services.embeddings import EmbeddingsService
from ..services.llm import LLMService

router = APIRouter()
embeddings_service = EmbeddingsService()
llm_service = LLMService()

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
        
        # Check OpenAI connection
        openai_status = "healthy"
        try:
            await llm_service.client.models.list()
        except Exception as e:
            openai_status = f"unhealthy: {str(e)}"
        
        return {
            "status": "healthy",
            "components": {
                "pinecone": pinecone_status,
                "openai": openai_status
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        } 