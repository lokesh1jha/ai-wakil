const { PrismaClient } = require('@prisma/client');
const fp = require('fastify-plugin');
const AuditLog = require('../models/audit-log.model');

const prisma = new PrismaClient();

async function projectRoutes(fastify, options) {
  // Create project
  fastify.post('/', {
    onRequest: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { title, description } = request.body;
    const userId = request.user.id;

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          userId
        }
      });

      // Create audit log
      await AuditLog.create({
        userId,
        actionType: 'CREATE',
        resourceType: 'PROJECT',
        resourceId: project.id,
        details: { title: project.title }
      });

      return project;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get all projects for user
  fastify.get('/', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const userId = request.user.id;

    try {
      const projects = await prisma.project.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });

      // Create audit log
      await AuditLog.create({
        userId,
        actionType: 'READ',
        resourceType: 'PROJECT',
        resourceId: 'all',
        details: { count: projects.length }
      });

      return projects;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get single project
  fastify.get('/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.id;

    try {
      const project = await prisma.project.findFirst({
        where: { id, userId }
      });

      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }

      // Create audit log
      await AuditLog.create({
        userId,
        actionType: 'READ',
        resourceType: 'PROJECT',
        resourceId: project.id,
        details: { title: project.title }
      });

      return project;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Update project
  fastify.put('/:id', {
    onRequest: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { title, description } = request.body;
    const userId = request.user.id;

    try {
      const project = await prisma.project.findFirst({
        where: { id, userId }
      });

      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data: { title, description }
      });

      // Create audit log
      await AuditLog.create({
        userId,
        actionType: 'UPDATE',
        resourceType: 'PROJECT',
        resourceId: project.id,
        details: { title: updatedProject.title }
      });

      return updatedProject;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Delete project
  fastify.delete('/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.id;

    try {
      const project = await prisma.project.findFirst({
        where: { id, userId }
      });

      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }

      await prisma.project.delete({
        where: { id }
      });

      // Create audit log
      await AuditLog.create({
        userId,
        actionType: 'DELETE',
        resourceType: 'PROJECT',
        resourceId: project.id,
        details: { title: project.title }
      });

      return { message: 'Project deleted successfully' };
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = fp(projectRoutes); 