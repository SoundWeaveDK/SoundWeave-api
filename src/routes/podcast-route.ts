import { FastifyInstance } from "fastify";
import { createPodcastHandler, deletePodcastHandler, readExplorePodcastsHandler, readFollowingPodcastsHandler, readPreviewPodcastsHandler, readSinglePodcastHandler, readUserPodcastsHandler, updatePodcastHandler } from "../controllers/podcast-controller";
import { $ref } from "../schemas/podcast-schemas";

async function podcastRoutes(server: FastifyInstance) {
    //CRUD routes
    server.post(
        "/create-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createPodcastRequestSchema"),
                response: {
                    201: $ref("createPodcastResponseSchema"),
                },
            },

        },
        createPodcastHandler
    );

    server.get(
        "/read-single-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastRequestSchema"),
                response: {
                    200: $ref("podcastResponseSchema"),
                },
            },
        },
        readSinglePodcastHandler
    );

    server.get(
        "/read-following-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                response: {
                    200: $ref("multiplePodcastResponseSchema"),
                },
            },
        },
        readFollowingPodcastsHandler
    );

    server.get(
        "/read-user-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                response: {
                    200: $ref("multiplePodcastResponseSchema"),
                },
            },
        },
        readUserPodcastsHandler
    );

    server.get(
        "/read-preview-podcast",
        {
            schema: {
                response: {
                    200: $ref("multiplePodcastResponseSchema"),
                },
            },
        },
        readPreviewPodcastsHandler
    );

    server.get(
        "/read-explore-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
                response: {
                    200: $ref("multiplePodcastResponseSchema"),
                },
            },
        },
        readExplorePodcastsHandler
    );

    server.patch(
        "/update-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("podcastRequestSchema"),
                body: $ref("updatePodcastRequestSchema"),
                response: {
                    200: $ref("updatePodcastResponseSchema"),
                },
            },
        },
        updatePodcastHandler
    );

    server.delete(
        "/delete-podcast/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deletePodcastRequestSchema")
            },
        },
        deletePodcastHandler
    );
}

export default podcastRoutes;