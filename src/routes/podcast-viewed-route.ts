import { FastifyInstance } from "fastify";
import { readUsersPodcastViewedHandler, addPodcastViewed, deleteSingleViewedHandler, deleteManyViewedHandler } from "../controllers/podcast-viewed-controller";
import { $ref } from "../schemas/podcast-viewed-schema";


async function podcastViewedRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-podcast-viewed/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastViewedReqestSchema")
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

    server.delete(
        "/delete-single-viewed-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deletePodcastViewedRequest"),
            },

        },
        deleteSingleViewedHandler
    );

    server.delete(
        "/delete-all-viewed/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deleteAllPodcastViewedRequest"),
            },

        },
        deleteManyViewedHandler
    );



}

export default podcastViewedRoutes;