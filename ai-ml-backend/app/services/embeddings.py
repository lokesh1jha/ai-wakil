from typing import List, Dict, Any
import pinecone
import google.generativeai as genai
from ..core.config import settings
import uuid

class EmbeddingsService:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('embedding-001')
        self._init_pinecone()
    
    def _init_pinecone(self):
        """Initialize Pinecone client."""
        pinecone.init(
            api_key=settings.PINECONE_API_KEY,
            environment=settings.PINECONE_ENVIRONMENT
        )
        
        # Create index if it doesn't exist
        if settings.PINECONE_INDEX_NAME not in pinecone.list_indexes():
            pinecone.create_index(
                name=settings.PINECONE_INDEX_NAME,
                dimension=768,  # Gemini embedding dimension
                metric="cosine"
            )
        
        self.index = pinecone.Index(settings.PINECONE_INDEX_NAME)
    
    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of texts using Gemini API."""
        try:
            embeddings = []
            for text in texts:
                result = self.model.embed_content(text)
                embeddings.append(result.embedding)
            return embeddings
        except Exception as e:
            raise Exception(f"Failed to generate embeddings: {str(e)}")
    
    async def store_embeddings(self, document_id: str, chunks: List[str], metadata: Dict[str, Any] = None) -> List[str]:
        """Store document chunks and their embeddings in Pinecone."""
        try:
            # Generate embeddings for chunks
            embeddings = await self.generate_embeddings(chunks)
            
            # Prepare vectors for upsert
            vectors = []
            for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
                vector_id = f"{document_id}_{i}"
                vector_metadata = {
                    "document_id": document_id,
                    "chunk_index": i,
                    "text": chunk,
                    **(metadata or {})
                }
                vectors.append((vector_id, embedding, vector_metadata))
            
            # Upsert vectors in batches
            batch_size = 100
            for i in range(0, len(vectors), batch_size):
                batch = vectors[i:i + batch_size]
                self.index.upsert(vectors=batch)
            
            return [vector[0] for vector in vectors]
        except Exception as e:
            raise Exception(f"Failed to store embeddings: {str(e)}")
    
    async def search_similar(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Search for similar documents using semantic search."""
        try:
            # Generate embedding for query
            query_embedding = await self.generate_embeddings([query])
            
            # Search in Pinecone
            results = self.index.query(
                vector=query_embedding[0],
                top_k=top_k,
                include_metadata=True
            )
            
            return [
                {
                    "id": match.id,
                    "score": match.score,
                    "text": match.metadata["text"],
                    "document_id": match.metadata["document_id"],
                    "metadata": {k: v for k, v in match.metadata.items() if k not in ["text", "document_id"]}
                }
                for match in results.matches
            ]
        except Exception as e:
            raise Exception(f"Failed to perform semantic search: {str(e)}")
    
    def delete_document(self, document_id: str):
        """Delete all vectors associated with a document."""
        try:
            self.index.delete(filter={"document_id": document_id})
        except Exception as e:
            raise Exception(f"Failed to delete document: {str(e)}") 