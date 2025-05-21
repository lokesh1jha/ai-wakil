import fitz  # PyMuPDF
import docx
import pdfplumber
from typing import List, Tuple
import re
from pathlib import Path
import tempfile
import os

class DocumentProcessor:
    def __init__(self):
        self.supported_extensions = {'.pdf', '.docx'}
    
    def process_document(self, file_path: str) -> List[str]:
        """Process a document and return its text chunks."""
        ext = Path(file_path).suffix.lower()
        if ext not in self.supported_extensions:
            raise ValueError(f"Unsupported file type: {ext}")
        
        if ext == '.pdf':
            return self._process_pdf(file_path)
        elif ext == '.docx':
            return self._process_docx(file_path)
    
    def _process_pdf(self, file_path: str) -> List[str]:
        """Process PDF file and return text chunks."""
        chunks = []
        
        # Try PyMuPDF first
        try:
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            chunks = self._chunk_text(text)
        except Exception as e:
            # Fallback to pdfplumber
            try:
                with pdfplumber.open(file_path) as pdf:
                    text = ""
                    for page in pdf.pages:
                        text += page.extract_text() or ""
                    chunks = self._chunk_text(text)
            except Exception as e:
                raise Exception(f"Failed to process PDF: {str(e)}")
        
        return chunks
    
    def _process_docx(self, file_path: str) -> List[str]:
        """Process DOCX file and return text chunks."""
        try:
            doc = docx.Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return self._chunk_text(text)
        except Exception as e:
            raise Exception(f"Failed to process DOCX: {str(e)}")
    
    def _chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
        """Split text into overlapping chunks."""
        # Clean text
        text = re.sub(r'\s+', ' ', text).strip()
        
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            end = start + chunk_size
            if end > text_length:
                end = text_length
            
            # Find the last period or newline in the chunk
            if end < text_length:
                last_period = text.rfind('.', start, end)
                last_newline = text.rfind('\n', start, end)
                end = max(last_period, last_newline) + 1 if max(last_period, last_newline) > start else end
            
            chunk = text[start:end].strip()
            if chunk:
                chunks.append(chunk)
            
            start = end - overlap
        
        return chunks
    
    def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file to temporary location and return the path."""
        temp_dir = tempfile.gettempdir()
        file_path = os.path.join(temp_dir, filename)
        
        with open(file_path, 'wb') as f:
            f.write(file_content)
        
        return file_path 