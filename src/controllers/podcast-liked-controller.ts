import { FastifyReply, FastifyRequest } from "fastify";
import { addPodcastToliked, readUsersPodcastLiked, deleteSinglePodcastFromLiked } from "../services/podcast-liked-service";
import { PodcastLiked, AddPodcastLiked, DeletePodcastLiked } from "../schemas/podcast-liked-schema";


export async function readUsersPodcastlikesHandler(request: FastifyRequest<{ Params: PodcastLiked }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcastLiked = await readUsersPodcastLiked(param)
        return reply.code(200).send(podcastLiked)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function addPodcastLiked(request: FastifyRequest<{ Body: AddPodcastLiked }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const addPodcastLike = await addPodcastToliked(body);
        return reply.code(200).send(addPodcastLike)
    } catch (error) {
        return reply.code(400).send(error);
    }
}

export async function deleteSingleLikedHandler(request: FastifyRequest<{ Params: DeletePodcastLiked }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const deleteLiked = await deleteSinglePodcastFromLiked(param)
        return reply.code(200).send(deleteLiked)
    } catch (error) {
        return reply.code(400).send(error);
    }
}