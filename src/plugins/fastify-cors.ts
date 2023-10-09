import fp from 'fastify-plugin';
import cors from '@fastify/cors'
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    await fastify.register(cors, {
        origin: '*',
    })
})