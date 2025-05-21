from typing import List, Dict, Any
from openai import OpenAI
from ..core.config import settings

class LLMService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.DEFAULT_MODEL
    
    async def generate_summary(self, text: str) -> str:
        """Generate a summary of the provided text."""
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal document summarizer. Provide a concise summary of the key points in the document."},
                    {"role": "user", "content": f"Please summarize the following legal document:\n\n{text}"}
                ],
                temperature=0.3,
                max_tokens=500
            )
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"Failed to generate summary: {str(e)}")
    
    async def answer_question(self, question: str, context: List[str]) -> Dict[str, Any]:
        """Answer a question based on the provided context."""
        try:
            # Combine context chunks
            combined_context = "\n\n".join(context)
            
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal assistant. Answer questions based on the provided legal document context. If the answer cannot be found in the context, say so."},
                    {"role": "user", "content": f"Context:\n{combined_context}\n\nQuestion: {question}"}
                ],
                temperature=0.3,
                max_tokens=500
            )
            
            return {
                "answer": response.choices[0].message.content,
                "sources": context
            }
        except Exception as e:
            raise Exception(f"Failed to answer question: {str(e)}")
    
    async def extract_clauses(self, text: str) -> List[Dict[str, str]]:
        """Extract and classify legal clauses from the text."""
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal document analyzer. Extract and classify legal clauses from the provided text. For each clause, identify its type and content."},
                    {"role": "user", "content": f"Please extract and classify the legal clauses from this text:\n\n{text}"}
                ],
                temperature=0.3,
                max_tokens=1000
            )
            
            # Parse the response into structured format
            clauses = []
            current_clause = {}
            
            for line in response.choices[0].message.content.split('\n'):
                line = line.strip()
                if line.startswith('Type:'):
                    if current_clause:
                        clauses.append(current_clause)
                    current_clause = {'type': line[5:].strip()}
                elif line.startswith('Content:'):
                    current_clause['content'] = line[8:].strip()
            
            if current_clause:
                clauses.append(current_clause)
            
            return clauses
        except Exception as e:
            raise Exception(f"Failed to extract clauses: {str(e)}")
    
    async def chat(self, messages: List[Dict[str, str]], context: List[str] = None) -> str:
        """Engage in a chat conversation with context."""
        try:
            system_message = {
                "role": "system",
                "content": "You are a legal assistant. Provide accurate and helpful responses based on the provided context."
            }
            
            if context:
                context_text = "\n\n".join(context)
                system_message["content"] += f"\n\nContext:\n{context_text}"
            
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[system_message] + messages,
                temperature=0.7,
                max_tokens=500
            )
            
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"Failed to process chat: {str(e)}") 