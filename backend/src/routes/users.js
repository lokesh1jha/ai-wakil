const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fp = require('fastify-plugin');
const AuditLog = require('../models/audit-log.model');

const prisma = new PrismaClient();

async function userRoutes(fastify, options) {
  // Sign up route
  fastify.post('/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          name: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { email, password, name } = request.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });

      // Create audit log
      await AuditLog.create({
        userId: user.id,
        actionType: 'CREATE',
        resourceType: 'USER',
        resourceId: user.id,
        details: { email: user.email }
      });

      const token = fastify.jwt.sign({ id: user.id });
      return { token, user: { id: user.id, email: user.email, name: user.name } };
    } catch (error) {
      if (error.code === 'P2002') {
        reply.code(400).send({ error: 'Email already exists' });
      } else {
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  });

  // Login route
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { email, password } = request.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // Create audit log
      await AuditLog.create({
        userId: user.id,
        actionType: 'LOGIN',
        resourceType: 'USER',
        resourceId: user.id,
        details: { email: user.email }
      });

      const token = fastify.jwt.sign({ id: user.id });
      return { token, user: { id: user.id, email: user.email, name: user.name } };
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get current user
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: request.user.id },
        select: { id: true, email: true, name: true, createdAt: true }
      });
      return user;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = fp(userRoutes); 