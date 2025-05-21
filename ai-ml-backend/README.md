# AI Legal Assistant Backend

A FastAPI-based microservice that provides AI-powered legal document processing and analysis capabilities.

## Features

- Document ingestion and parsing (PDF, DOCX)
- Text extraction and preprocessing
- Embeddings generation and vector storage
- LLM-powered document analysis
- Semantic search capabilities
- Secure API endpoints with authentication

## Tech Stack

- Python 3.10+
- FastAPI + Uvicorn
- LangChain for LLM orchestration
- Pinecone for vector storage
- OpenAI API for embeddings and LLM
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
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
JWT_SECRET_KEY=your_jwt_secret_key
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

- `POST /upload`: Upload and process legal documents
- `POST /query`: Query documents with natural language
- `POST /summary`: Generate document summaries
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

## License

MIT License 