import fp from 'fastify-plugin';
import { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';

/**
 * This plugins adds jwt to fastify
 *
 * @see https://github.com/fastify/fastify-jwt
 */

/*
module.exports = fp(async function (fastify, opts) {
    fastify.register(fastifyJwt, {
        secret: server.config.SECRET
    })

    fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})
*/



