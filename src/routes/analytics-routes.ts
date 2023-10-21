import { FastifyInstance } from "fastify";
import { readSinglePodcastAnalyticsHandler } from "../controllers/analytics-controller";
import { $ref } from "../schemas/analytics-schema"



async function podcastAnalyticsRoutes(server: FastifyInstance) {
    server.get(
        "/read-podcast-analytics/:podcastId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("readPodcastAnalyticsRequest"),
                response: {
                    200: $ref("readPodcastAnalyticsResponse"),
                },
            },

        },
        readSinglePodcastAnalyticsHandler
    );
}

export default podcastAnalyticsRoutes;