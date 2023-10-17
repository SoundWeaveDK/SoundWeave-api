import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import dotenv from "dotenv";
import { userSchema } from "./schemas/user-schema";
import azureStorageRoutes from "./routes/azure-storage-route";
import { podcastSchema } from "./schemas/podcast-schemas";
import userRoutes from "./routes/user-routes";
import fastifyJwt from "./plugins/fastify-jwt";
import fastifyEnv from "./plugins/fastify-env";
import fastifySwagger from "./plugins/fastify-swagger";
import FastifyCors from "./plugins/fastify-cors";
import podcastRoutes from "./routes/podcast-route";
import { countrySchema } from "./schemas/country-schema";
import countryRoutes from "./routes/country-route";
import genderRoutes from "./routes/gender-route";
import { genderSchema } from "./schemas/gender-schema";
import watchlaterRoutes from "./routes/watch-later-routes";
import { watchlaterSchema } from "./schemas/watch-later-schema";
import { followerSchema } from "./schemas/follower-schema";
import folloerRoutes from "./routes/follower-routes";
import podcastLikedRoutes from "./routes/podcast-liked-routes";
import { podcastLikedSchema } from "./schemas/podcast-liked-schema";
import { podcastViewedSchema } from "./schemas/podcast-viewed-schema"
import podcastViewedRoutes from "./routes/podcast-viewed-route";
import { commentSchema } from "./schemas/comment-schema";
import readPodcastCommentsRoutes from "./routes/comment-route";
const server = Fastify({
  logger: true,
});

const start = async () => {
  dotenv.config();

  await server.register(fastifyEnv);
  await server.register(fastifyJwt);
  await server.register(fastifySwagger);
  await server.register(FastifyCors);

  for (const schema of [
    ...userSchema,
    ...podcastSchema,
    ...countrySchema,
    ...genderSchema,
    ...watchlaterSchema,
    ...followerSchema,
    ...podcastLikedSchema,
    ...podcastViewedSchema,
    ...commentSchema
  ]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/user" });
  server.register(podcastRoutes, { prefix: "api/podcast" });
  server.register(countryRoutes, { prefix: "api/country" });
  server.register(genderRoutes, { prefix: "api/gender" });
  server.register(azureStorageRoutes, { prefix: "api/azurestorage" });
  server.register(watchlaterRoutes, { prefix: "api/watchlater" });
  server.register(folloerRoutes, { prefix: "api/followuser" });
  server.register(podcastLikedRoutes, { prefix: "api/podcastliked" });
  server.register(podcastViewedRoutes, { prefix: "api/podcastviewed" });
  server.register(readPodcastCommentsRoutes, { prefix: "api/podcastcomments" });

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
