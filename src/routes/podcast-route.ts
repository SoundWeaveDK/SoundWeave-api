import { FastifyInstance } from "fastify";
import { createPodcastHandler, deletePodcastHandler, readSinglePodcastHandler, updatePodcastHandler } from "../controllers/podcast-controller";
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
                params: $ref("readSinglePodcastRequestSchema"),
                response: {
                    200: $ref("readSinglePodcastResponseSchema"),
                },
            },

        },
        readSinglePodcastHandler
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