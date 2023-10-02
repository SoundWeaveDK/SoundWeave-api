import Fastify from "fastify";
import dotenv from "dotenv";
import { userSchema } from "./schemas/userSchema";
import userRoutes from "./routes/user.routes";
import fastify from "fastify";
const server = Fastify({
  logger: true,
});

server.get("/", async function handler(request, reply) {
  return "root route";
});

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
