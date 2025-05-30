require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const rateLimit = require('fastify-rate-limit');
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');

// Import routes
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');

// Register plugins
fastify.register(cors, {
  origin: true,
  credentials: true
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET
});

fastify.register(rateLimit, {
  max: process.env.RATE_LIMIT_MAX,
  timeWindow: process.env.RATE_LIMIT_TIME_WINDOW
});

// Swagger configuration
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'AI Wakil API',
      description: 'API documentation for AI Wakil backend',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

fastify.register(swaggerUi, {
  routePrefix: '/documentation'
});

// Register routes
fastify.register(userRoutes, { prefix: '/api/users' });
fastify.register(projectRoutes, { prefix: '/api/projects' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 


// TODO 
/*
Set up your databases:
Create a PostgreSQL database named ai_wakil
Ensure MongoDB is running
Run Prisma migrations:
Apply to server.js
Run
dev
Start the development server:
Apply to server.js
Run
dev
The API will be available at http://localhost:3000, and you can access the Swagger documentation at http://localhost:3000/documentation. */