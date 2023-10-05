import { FastifyInstance } from "fastify";
import { createPodcastHandler } from "../controllers/podcast-controller";
import { $ref } from "../schemas/podcast-schemas";

async function podcastRoutes(server: FastifyInstance) {
    server.post(
        "/createPodcast",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createPodcastSchema"),
                response: {
                    201: $ref("podcastResponseSchema"),
                },
            },

        },
        createPodcastHandler
    );
}

export default podcastRoutes;