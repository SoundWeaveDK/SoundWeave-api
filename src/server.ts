import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import dotenv from "dotenv";
import { userSchema } from "./schemas/user-schema";
import userRoutes from "./routes/user-routes";
import azureStorageRoutes from "./routes/azure-storage-routes-test";
import fastifyJwt from "./plugins/fastify-jwt";
import fastifyEnv from "./plugins/fastify-env";
import fastifySwagger from "./plugins/fastify-swagger";
import FastifyCors from "./plugins/fastify-cors";
const server = Fastify({
  logger: true,
});

const start = async () => {
  dotenv.config();

  await server.register(fastifyEnv);
  await server.register(fastifyJwt);
  await server.register(fastifySwagger);
  await server.register(FastifyCors);

  for (const schema of userSchema) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(azureStorageRoutes, { prefix: "api/azurestorage" });

  try {
    const envPort: number = process.env.PORT
      ? parseInt(process.env.PORT)
      : 3000;
    await server.listen({ port: envPort, host: "0.0.0.0" });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
