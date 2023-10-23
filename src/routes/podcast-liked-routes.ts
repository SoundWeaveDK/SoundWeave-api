import { FastifyInstance } from "fastify";
import { readUsersPodcastlikesHandler, addPodcastLiked, deleteSingleLikedHandler } from "../controllers/podcast-liked-controller";
import { $ref } from "../schemas/podcast-liked-schema";


async function podcastLikedRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-podcast-liked/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastLikedReqestSchema"),
            },

        },
        readUsersPodcastlikesHandler
    );

    server.post(
        "/add-liked-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("addPodcastLikedRequestSchema"),
                response: {
                    201: $ref("addPodcastLikedResponesSchema"),
                },
            },

        },
        addPodcastLiked
    );


    server.delete(
        "/delete-single-liked-podcast/id/:id/podcastId/:podcastId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deletePodcastLikedRequest"),
            },

        },
        deleteSingleLikedHandler
    );



}

export default podcastLikedRoutes;