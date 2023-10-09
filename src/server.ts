import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import dotenv from "dotenv";
import { userSchema } from "./schemas/userSchema";
import { podcastSchema } from "./schemas/podcast-schemas";
import userRoutes from "./routes/user.routes";
import fastifyJwt from "./plugins/fastifyJwt";
import fastifyEnv from "./plugins/fastifyEnv";
import fastifySwagger from "./plugins/fastifySwagger";
import FastifyCors from "./plugins/FastifyCors";
import podcastRoutes from "./routes/podcast-route";
import { countrySchema } from "./schemas/country-schema";
import countryRoutes from "./routes/country-route";
import genderRoutes from "./routes/gender-route";
import { genderSchema } from "./schemas/gender-schema";
const server = Fastify({
  logger: true,
});


const start = async () => {
  dotenv.config();

  await server.register(fastifyEnv);
  await server.register(fastifyJwt);
  await server.register(fastifySwagger);
  await server.register(FastifyCors);

  for (const schema of [...userSchema, ...podcastSchema, ...countrySchema, ...genderSchema]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/user" });
  server.register(podcastRoutes, { prefix: "api/podcast" });
  server.register(countryRoutes, { prefix: "api/country" });
  server.register(genderRoutes, { prefix: "api/gender" });

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
