from typing import List, Dict, Any, Optional
import google.generativeai as genai
from ..core.config import settings
from .document_service import DocumentService

class ChatService:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
        self.document_service = DocumentService()
        self.chat_sessions: Dict[str, List[Dict]] = {}  # Store chat history
    
    async def start_chat(self, document_id: str) -> str:
        """Start a new chat session for a document."""
        session_id = f"chat_{document_id}"
        self.chat_sessions[session_id] = []
        return session_id
    
    async def chat_with_document(
        self,
        session_id: str,
        message: str,
        document_id: str
    ) -> Dict[str, Any]:
        """Chat about a specific document."""
        try:
            # Get document content
            document = await self.document_service.get_document(document_id)
            if not document:
                raise ValueError("Document not found")
            
            # Prepare context with document content
            context = f"""Document: {document['filename']}
Content:
{document['content']}

Previous conversation:
{self._format_chat_history(session_id)}"""
            
            # Generate response
            prompt = f"{context}\n\nUser: {message}"
            response = self.model.generate_content(prompt)
            
            # Store in chat history
            self.chat_sessions[session_id].extend([
                {"role": "user", "content": message},
                {"role": "assistant", "content": response.text}
            ])
            
            return {
                "response": response.text,
                "document_id": document_id,
                "session_id": session_id
            }
        except Exception as e:
            raise Exception(f"Failed to process chat: {str(e)}")
    
    def _format_chat_history(self, session_id: str) -> str:
        """Format chat history for context."""
        history = self.chat_sessions.get(session_id, [])
        return "\n".join([
            f"{msg['role']}: {msg['content']}"
            for msg in history[-5:]  # Only use last 5 messages for context
        ])
    
    async def get_chat_history(self, session_id: str) -> List[Dict]:
        """Get chat history for a session."""
        return self.chat_sessions.get(session_id, [])
    
    async def clear_chat_history(self, session_id: str):
        """Clear chat history for a session."""
        if session_id in self.chat_sessions:
            self.chat_sessions[session_id] = [] 