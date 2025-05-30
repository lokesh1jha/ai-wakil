# AI Legal Assistant Backend

A FastAPI-based microservice that provides AI-powered legal document processing and analysis capabilities.

## Features

- Document ingestion and parsing (PDF, DOCX)
- Text extraction and preprocessing
- Embeddings generation and vector storage
- LLM-powered document analysis using Google's Gemini
- Semantic search capabilities
- Secure API endpoints with authentication

## Tech Stack

- Python 3.10+
- FastAPI + Uvicorn
- LangChain for LLM orchestration
- Google's Gemini API for embeddings and LLM
- Pinecone for vector storage
- PyMuPDF/pdfplumber for PDF processing
- python-docx for DOCX processing

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-ml-backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your configuration:
```env
# Security Configuration
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Google Gemini API Configuration
GOOGLE_API_KEY=your-gemini-api-key-here

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# File Upload Configuration
MAX_UPLOAD_SIZE=10485760  # 10MB in bytes
ALLOWED_EXTENSIONS=pdf,doc,docx

# Pinecone Configuration
PINECONE_API_KEY=your-pinecone-api-key-here
PINECONE_ENVIRONMENT=your-pinecone-environment-here
PINECONE_INDEX_NAME=legal-documents
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /auth/token`: Get access token
- `POST /auth/register`: Register new user

### Documents
- `POST /documents/upload`: Upload and process legal documents
- `POST /documents/query`: Query documents with natural language
- `DELETE /documents/{document_id}`: Delete a document

### Chat
- `POST /chat`: Chat with the AI assistant
- `POST /chat/analyze`: Analyze a document and answer questions
- `POST /chat/summarize`: Generate document summaries

### Health
- `GET /health`: Health check endpoint

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
isort .
flake8
```

## Docker Support

Build and run with Docker:
```bash
docker build -t ai-legal-assistant .
docker run -p 8000:8000 ai-legal-assistant
```

## Environment Variables

### Required Variables
- `GOOGLE_API_KEY`: Your Google Gemini API key
- `PINECONE_API_KEY`: Your Pinecone API key
- `PINECONE_ENVIRONMENT`: Your Pinecone environment
- `SECRET_KEY`: Secret key for JWT token generation

### Optional Variables
- `CORS_ORIGINS`: Comma-separated list of allowed origins (default: http://localhost:3000)
- `MAX_UPLOAD_SIZE`: Maximum file upload size in bytes (default: 10MB)
- `ALLOWED_EXTENSIONS`: Comma-separated list of allowed file extensions
- `DEBUG`: Enable debug mode (default: False)

## License

MIT License 