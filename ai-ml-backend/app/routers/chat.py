from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from app.services.chat_service import ChatService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
chat_service = ChatService()

class ChatRequest(BaseModel):
    message: str
    document_id: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    document_id: str

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Chat with the AI assistant about a specific document
    """
    try:
        # Start new session if not provided
        session_id = request.session_id or await chat_service.start_chat(request.document_id)
        
        # Get response from chat service
        response = await chat_service.chat_with_document(
            session_id=session_id,
            message=request.message,
            document_id=request.document_id
        )
        
        return ChatResponse(**response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ChatHistoryResponse(BaseModel):
    messages: List[dict]

@router.get("/history/{session_id}", response_model=ChatHistoryResponse)
async def get_chat_history(
    session_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get chat history for a session
    """
    try:
        history = await chat_service.get_chat_history(session_id)
        return ChatHistoryResponse(messages=history)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/history/{session_id}")
async def clear_chat_history(
    session_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Clear chat history for a session
    """
    try:
        await chat_service.clear_chat_history(session_id)
        return {"message": "Chat history cleared successfully"}
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