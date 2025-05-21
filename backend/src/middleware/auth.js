const fp = require('fastify-plugin');

async function authMiddleware(fastify, options) {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

module.exports = fp(authMiddleware); 