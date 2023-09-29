import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
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
export default fastifyPlugin(
    async (fastify: FastifyInstance) => {
        await fastify.register(fastifyEnv, options);
    }
);