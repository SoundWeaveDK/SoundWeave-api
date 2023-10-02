import Fastify from "fastify";
import { userSchema } from "../src/schemas/user.schema";
import userRoutes from "./routes/user.routes";
const server = Fastify({
  logger: true,
});

server.get("/", async function handler(request, reply) {
  return "root route";
});

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
