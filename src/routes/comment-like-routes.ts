import { FastifyInstance } from "fastify";
import { AddCommentLikeHandler, deleteCommentLikeHandler } from "../controllers/comment-like-controller";
import { $ref } from "../schemas/comment-like-schema"

async function commentLikeRoutes(server: FastifyInstance) {
    server.post(
        "/add-comment-like",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("addCommentLikeRequestSchema"),
                response: {
                    201: $ref("addCommentLikeResponseSchema"),
                },
            },

        },
        AddCommentLikeHandler
    );


    server.delete(
        "/delete-comment-like/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deleteCommentLikeRequestSchema"),
            },

        },
        deleteCommentLikeHandler
    );

}

export default commentLikeRoutes;