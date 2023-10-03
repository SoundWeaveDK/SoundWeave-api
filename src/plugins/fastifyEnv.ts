import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyEnv } from "@fastify/env"


const schema = {
    type: 'object',
    required: ['SECRET'],
    properties: {
        SECRET: {
            type: 'string'
        }
    }
}

const options = { schema: schema }


declare module "fastify" {
    interface FastifyInstance {
        config: {
            SECRET: string;
        };
    }
}

/**
 * This plugins adds env to fastify
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    await fastify.register(fastifyEnv, options);
});