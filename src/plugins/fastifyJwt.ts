import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';

/**
 * This plugins adds jwt to fastify
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fastifyPlugin(
    async (fastify: FastifyInstance) => {
        await fastify.register(fastifyJwt, {
            secret: fastify.config.SECRET
        });
    }
);