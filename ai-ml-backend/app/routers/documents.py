from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import List, Optional
from ..core.security import verify_token
from ..services.document_processor import DocumentProcessor
from ..services.embeddings import EmbeddingsService
from ..services.llm import LLMService
import uuid
import os

router = APIRouter()
document_processor = DocumentProcessor()
embeddings_service = EmbeddingsService()
llm_service = LLMService()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    metadata: Optional[str] = Form(None),
    token: dict = Depends(verify_token)
):
    """Upload and process a legal document."""
    try:
        # Validate file type
        if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Save file temporarily
        file_path = document_processor.save_uploaded_file(await file.read(), file.filename)
        
        # Process document
        chunks = document_processor.process_document(file_path)
        
        # Generate document ID
        document_id = str(uuid.uuid4())
        
        # Store embeddings
        vector_ids = await embeddings_service.store_embeddings(
            document_id=document_id,
            chunks=chunks,
            metadata={"filename": file.filename, "metadata": metadata}
        )
        
        # Clean up temporary file
        os.remove(file_path)
        
        return {
            "document_id": document_id,
            "chunks": len(chunks),
            "vector_ids": vector_ids
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query")
async def query_documents(
    query: str,
    top_k: int = 5,
    token: dict = Depends(verify_token)
):
    """Query documents using semantic search and get AI-generated answers."""
    try:
        # Search for relevant chunks
        results = await embeddings_service.search_similar(query, top_k=top_k)
        
        if not results:
            return {"answer": "No relevant documents found.", "sources": []}
        
        # Get context from results
        context = [result["text"] for result in results]
        
        # Generate answer using LLM
        answer = await llm_service.answer_question(query, context)
        
        return {
            "answer": answer["answer"],
            "sources": answer["sources"],
            "metadata": [result["metadata"] for result in results]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summary/{document_id}")
async def summarize_document(
    document_id: str,
    token: dict = Depends(verify_token)
):
    """Generate a summary of a document."""
    try:
        # Get document chunks from vector store
        results = embeddings_service.index.query(
            vector=[0] * 1536,  # Dummy vector
            filter={"document_id": document_id},
            top_k=100,
            include_metadata=True
        )
        
        if not results.matches:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Combine chunks
        text = "\n\n".join([match.metadata["text"] for match in results.matches])
        
        # Generate summary
        summary = await llm_service.generate_summary(text)
        
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
    token: dict = Depends(verify_token)
):
    """Delete a document and its embeddings."""
    try:
        embeddings_service.delete_document(document_id)
        return {"message": "Document deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 