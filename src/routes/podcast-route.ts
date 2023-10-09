import { FastifyInstance } from "fastify";
import { createPodcastHandler, deletePodcastHandler, readFollowingPodcastsHandler, readSinglePodcastHandler, updatePodcastHandler } from "../controllers/podcast-controller";
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


    server.patch(
        "/update-podcast",
        {
            preHandler: [server.authenticate],
            schema: {
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