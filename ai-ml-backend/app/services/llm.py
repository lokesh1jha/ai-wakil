from typing import List, Dict, Any
import google.generativeai as genai
from ..core.config import settings

class LLMService:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_summary(self, text: str) -> str:
        """Generate a summary of the provided text."""
        try:
            prompt = f"""You are a legal document summarizer. Please provide a concise summary of the key points in the following document:

{text}

Focus on the main arguments, important details, and any legal implications."""

            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate summary: {str(e)}")
    
    async def answer_question(self, question: str, context: List[str]) -> Dict[str, Any]:
        """Answer a question based on the provided context."""
        try:
            context_text = "\n\n".join(context)
            prompt = f"""Context:
{context_text}

Question: {question}

Please answer the question based on the provided context. If the answer cannot be found in the context, please state that clearly."""

            response = self.model.generate_content(prompt)
            return {
                "answer": response.text,
                "sources": context
            }
        except Exception as e:
            raise Exception(f"Failed to answer question: {str(e)}")
    
    async def extract_clauses(self, text: str) -> List[Dict[str, str]]:
        """Extract and classify legal clauses from the text."""
        try:
            response = await self.model.generate_content(f"You are a legal document analyzer. Extract and classify legal clauses from the provided text. For each clause, identify its type and content.\n\n{text}")
            
            # Parse the response into structured format
            clauses = []
            current_clause = {}
            
            for line in response.text.split('\n'):
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
            
            response = await self.model.generate_content(f"{system_message['content']}\n\n" + "\n\n".join([f"{message['role']}: {message['content']}" for message in messages]))
            
            return response.text
        except Exception as e:
            raise Exception(f"Failed to process chat: {str(e)}") 