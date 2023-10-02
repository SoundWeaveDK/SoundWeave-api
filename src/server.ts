import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import dotenv from "dotenv";
import { userSchema } from "./schemas/userSchema";
import userRoutes from "./routes/user.routes";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
export const server = Fastify({
  logger: true,
});


declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}


server.register(fastifyJwt, {
  secret: "Dansker",
});

server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

const start = async () => {
  dotenv.config();
  for (const schema of userSchema) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: "api/users" });
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
