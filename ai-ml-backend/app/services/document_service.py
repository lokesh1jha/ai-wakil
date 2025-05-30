from typing import List, Dict, Any, Optional
import os
from datetime import datetime
import uuid
from ..core.config import settings
from .credit_service import CreditService

class DocumentService:
    def __init__(self):
        self.documents: Dict[str, Dict] = {}  # In-memory storage for demo
        self.credit_service = CreditService()
    
    async def store_document(self, content: str, filename: str, user_id: str, metadata: Optional[Dict] = None) -> str:
        """Store a document and return its ID."""
        # Check if user has enough credits
        user_credits = await self.credit_service.get_user_credits(user_id)
        if user_credits < 1:  # Each document costs 1 credit
            raise ValueError("Insufficient credits. Please purchase more credits to continue.")
        
        # Deduct credits
        await self.credit_service.deduct_credits(user_id, 1)
        
        document_id = str(uuid.uuid4())
        self.documents[document_id] = {
            "id": document_id,
            "content": content,
            "filename": filename,
            "user_id": user_id,
            "metadata": metadata or {},
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        return document_id
    
    async def get_document(self, document_id: str) -> Optional[Dict]:
        """Retrieve a document by ID."""
        return self.documents.get(document_id)
    
    async def list_documents(self, user_id: str) -> List[Dict]:
        """List all documents for a user."""
        return [
            doc for doc in self.documents.values()
            if doc["user_id"] == user_id
        ]
    
    async def delete_document(self, document_id: str, user_id: str) -> bool:
        """Delete a document by ID."""
        doc = self.documents.get(document_id)
        if doc and doc["user_id"] == user_id:
            del self.documents[document_id]
            return True
        return False
    
    async def update_document(self, document_id: str, content: str, user_id: str, metadata: Optional[Dict] = None) -> bool:
        """Update a document's content and metadata."""
        doc = self.documents.get(document_id)
        if doc and doc["user_id"] == user_id:
            self.documents[document_id].update({
                "content": content,
                "metadata": metadata or doc["metadata"],
                "updated_at": datetime.utcnow().isoformat()
            })
            return True
        return False 