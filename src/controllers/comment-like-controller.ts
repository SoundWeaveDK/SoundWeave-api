import { FastifyReply, FastifyRequest } from "fastify";
import { addCommentLike, deleteCommentLike } from "../services/comment-like-service";
import { AddCommentLike, DeleteCommentLike } from "../schemas/comment-like-schema";

export async function AddCommentLikeHandler(request: FastifyRequest<{ Body: AddCommentLike }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const commentLike = await addCommentLike(body)
        return reply.code(200).send(commentLike)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function deleteCommentLikeHandler(request: FastifyRequest<{ Params: DeleteCommentLike }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const delCommentLike = await deleteCommentLike(param)
        return reply.code(200).send(delCommentLike)
    } catch (error) {
        return reply.code(400).send(error);
    }
}