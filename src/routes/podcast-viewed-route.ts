import { FastifyInstance } from "fastify";
import { readUsersPodcastViewedHandler, addPodcastViewed } from "../controllers/podcast-viewed-controller";
import { $ref } from "../schemas/podcast-viewed-schema";


async function podcastViewedRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-podcast-viewed/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastViewedReqestSchema"),
                response: {
                    200: $ref("podcastViewedResponseSchema"),
                },
            },

        },
        readUsersPodcastViewedHandler
    );

    server.post(
        "/add-viewed-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("addPodcastViewedRequestSchema"),
                response: {
                    201: $ref("addPodcastViewedResponesSchema"),
                },
            },
        },
        addPodcastViewed
    );



}

export default podcastViewedRoutes;