import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { JWT, fastifyJwt } from '@fastify/jwt';

/**
 * This plugins adds jwt to fastify
 *
 * @see https://github.com/fastify/fastify-jwt
 */
declare module "fastify" {
    interface FastifyInstance {
        authenticate: any;
    }
}

export let jwt: JWT;

export default fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    await fastify.register(fastifyJwt, {
        secret: fastify.config.SECRET
    })

    jwt = fastify.jwt

    fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})




