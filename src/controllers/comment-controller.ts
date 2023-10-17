import { FastifyReply, FastifyRequest } from "fastify";
import { readUsersComment, addPodcastComments, deleteSinglePodcastComment } from "../services/comment-service";
import { ReadPodcastComments, AddPodcastComments, DeletePodcastComments } from "../schemas/comment-schema";

export async function readUserCommentHandler(request: FastifyRequest<{ Params: ReadPodcastComments }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const readUserComment = await readUsersComment(param)
        return reply.code(200).send(readUserComment)
    } catch (error) {
        return reply.code(400).send(error);
    }
}

export async function AddPodcastCommentHandler(request: FastifyRequest<{ Body: AddPodcastComments }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const podcastComment = await addPodcastComments(body)
        return reply.code(201).send(podcastComment)
    } catch (error) {
        return reply.code(400).send(error);
    }
}

export async function deleteSingleCommentHandler(request: FastifyRequest<{ Params: DeletePodcastComments }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const deleteComment = await deleteSinglePodcastComment(param)
        return reply.code(200).send(deleteComment)
    } catch (error) {
        return reply.code(400).send(error);
    }
}