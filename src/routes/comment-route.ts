import { FastifyInstance } from "fastify";
import { readUserCommentHandler, AddPodcastCommentHandler, deleteSingleCommentHandler } from "../controllers/comment-controller";
import { $ref } from "../schemas/comment-schema"

async function readPodcastCommentsRoutes(server: FastifyInstance) {
    server.get(
        "/read-single-podcast-comments/:podcastId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("readPodcastCommentsRequestSchema"),
                response: {
                    200: $ref("readPodcastCommnetResponseSchema"),
                },
            },

        },
        readUserCommentHandler
    );

    server.post(
        "/add-comment",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("addPodcastCommentRequestSchema"),
                response: {
                    201: $ref("addPodcastCommentResponseSchema"),
                },
            },

        },
        AddPodcastCommentHandler
    );

    server.delete(
        "/delete-comment/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deletePodcastCommentResponseSchema"),
            },

        },
        deleteSingleCommentHandler
    );

}

export default readPodcastCommentsRoutes;