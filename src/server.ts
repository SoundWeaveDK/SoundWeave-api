import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { userSchema } from "../src/schemas/user.schema";
import userRoutes from './routes/user.routes';
import fastifyJwt from '@fastify/jwt';
export const server = Fastify({
  logger: true
})

declare module "fastify" {
  export interface FastifyInstance {
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
  for (const schema of userSchema) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: "api/users" });
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
