# AI Wakil Backend

A scalable backend API built with Fastify, PostgreSQL, and MongoDB.

## Features

- User authentication with JWT
- PostgreSQL database with Prisma ORM
- MongoDB for audit logging
- Rate limiting
- CORS support
- Swagger/OpenAPI documentation
- Modular route structure

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- MongoDB

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-wakil-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the environment variables with your configuration

4. Set up the database:
```bash
# Create PostgreSQL database
createdb ai_wakil

# Run Prisma migrations
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Documentation

Once the server is running, you can access the Swagger documentation at:
`http://localhost:3000/documentation`

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm test`: Run tests

## API Endpoints

### Authentication
- `POST /api/users/signup`: Register a new user
- `POST /api/users/login`: Login user
- `GET /api/users/me`: Get current user profile

### Projects
- `POST /api/projects`: Create a new project
- `GET /api/projects`: Get all projects for current user
- `GET /api/projects/:id`: Get a specific project
- `PUT /api/projects/:id`: Update a project
- `DELETE /api/projects/:id`: Delete a project

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Rate limiting is enabled
- CORS is configured for security

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:
```json
{
  "error": "Error message"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 