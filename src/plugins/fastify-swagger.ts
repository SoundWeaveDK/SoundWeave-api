import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export default fp(async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  await fastify.register(swagger, {
    mode: "dynamic",
    openapi: {
      info: {
        title: "SoundWeave Swagger",
        description: "Documentation of our backend routes",
        version: "1.0.1",
      },
      servers: [
        { url: "http://localhost:3000", description: "Development server" },
        {
          url: "https://api.soundweave.dk",
          description: "Production server",
        },
      ],
    },
  });
  await fastify.register(swaggerUi, {
    routePrefix: "/api/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });
});
