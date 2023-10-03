import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export default fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    await fastify.register(swagger, {
        openapi: {
            info: {
                title: "SoundWeave Swagger",
                description: 'Documentation of our backend routes',
                version: "1.0.1",
            },

        },
    });
    await fastify.register(
        swaggerUi, {
        routePrefix: "/api/docs",
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
    }
    );
});
