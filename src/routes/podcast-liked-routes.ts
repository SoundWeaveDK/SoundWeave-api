import { FastifyInstance } from "fastify";
import { readUsersPodcastlikesHandler, addPodcastLiked } from "../controllers/podcast-liked-controller";
import { $ref } from "../schemas/podcast-liked-schema";


async function podcastLikedRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-podcast-liked/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastLikedReqestSchema"),
                response: {
                    200: $ref("podcastLikedResponseSchema"),
                },
            },

        },
        readUsersPodcastlikesHandler
    );

    server.post(
        "/add-liked-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("podcastLikedReqestSchema"),
                response: {
                    201: $ref("podcastLikedResponseSchema"),
                },
            },

        },
        addPodcastLiked
    );



}

export default podcastLikedRoutes;