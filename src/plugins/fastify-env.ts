import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { fastifyEnv } from "@fastify/env";

const schema = {
  type: "object",
  required: ["SECRET", "DATABASE_URL"],
  properties: {
    SECRET: {
      type: "string",
    },
    DATABASE_URL: {
      type: "string",
    },
  },
};

const options = { schema: schema };

declare module "fastify" {
  interface FastifyInstance {
    config: {
      SECRET: string;
      DATABASE_URL: string;
    };
  }
}

/**
 * This plugins adds env to fastify
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp(async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  await fastify.register(fastifyEnv, options);
});
