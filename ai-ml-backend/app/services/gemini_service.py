import os
from typing import List, Optional
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage

# Configure the Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
        self.chat_model = ChatGoogleGenerativeAI(
            model="gemini-pro",
            temperature=0.7,
            convert_system_message_to_human=True
        )

    async def generate_response(self, prompt: str, context: Optional[str] = None) -> str:
        """
        Generate a response using Gemini API
        """
        try:
            if context:
                full_prompt = f"Context: {context}\n\nUser: {prompt}"
            else:
                full_prompt = prompt

            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return "I apologize, but I encountered an error while processing your request."

    async def chat_with_history(
        self,
        messages: List[dict],
        context: Optional[str] = None
    ) -> str:
        """
        Chat with history using Gemini API
        """
        try:
            # Convert messages to LangChain format
            langchain_messages = []
            for msg in messages:
                if msg["role"] == "system":
                    langchain_messages.append(SystemMessage(content=msg["content"]))
                else:
                    langchain_messages.append(HumanMessage(content=msg["content"]))

            # Add context if provided
            if context:
                langchain_messages.insert(0, SystemMessage(content=f"Context: {context}"))

            # Generate response
            response = await self.chat_model.agenerate([langchain_messages])
            return response.generations[0][0].text
        except Exception as e:
            print(f"Error in chat with history: {str(e)}")
            return "I apologize, but I encountered an error while processing your request."

    async def analyze_document(self, document_content: str, question: str) -> str:
        """
        Analyze a document and answer questions about it
        """
        try:
            prompt = f"""Document Content:
{document_content}

Question: {question}

Please analyze the document and answer the question based on its content. 
If the answer cannot be found in the document, please state that clearly."""

            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error analyzing document: {str(e)}")
            return "I apologize, but I encountered an error while analyzing the document."

    async def summarize_document(self, document_content: str) -> str:
        """
        Generate a summary of the document
        """
        try:
            prompt = f"""Please provide a concise summary of the following document:

{document_content}

Focus on the key points and main arguments."""

            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error summarizing document: {str(e)}")
            return "I apologize, but I encountered an error while summarizing the document." 