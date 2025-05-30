from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from app.services.gemini_service import GeminiService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
gemini_service = GeminiService()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Chat with the AI assistant
    """
    try:
        # Convert messages to the format expected by Gemini
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Get response from Gemini
        response = await gemini_service.chat_with_history(
            messages=messages,
            context=request.context
        )
        
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class DocumentAnalysisRequest(BaseModel):
    document_content: str
    question: str

@router.post("/analyze", response_model=ChatResponse)
async def analyze_document(
    request: DocumentAnalysisRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Analyze a document and answer questions about it
    """
    try:
        response = await gemini_service.analyze_document(
            document_content=request.document_content,
            question=request.question
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SummaryRequest(BaseModel):
    document_content: str

@router.post("/summarize", response_model=ChatResponse)
async def summarize_document(
    request: SummaryRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Generate a summary of the document
    """
    try:
        response = await gemini_service.summarize_document(
            document_content=request.document_content
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 