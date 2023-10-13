import { FastifyInstance } from "fastify";
import { readUsersPodcastlikesHandler } from "../controllers/podcast-liked-controller";
import { $ref } from "../schemas/podcast-liked-schema";


async function podcastLikedRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-podcast-liked/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastLikedReqestSchema"),
                response: {
                    201: $ref("podcastLikedResponseSchema"),
                },
            },

        },
        readUsersPodcastlikesHandler
    );



}

export default podcastLikedRoutes;