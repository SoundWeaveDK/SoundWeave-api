import { FastifyReply, FastifyRequest } from "fastify";
import { readUsersPodcastLiked } from "../services/podcast-liked-service";
import { PodcastLiked } from "../schemas/podcast-liked-schema";


export async function readUsersPodcastlikesHandler(request: FastifyRequest<{ Params: PodcastLiked }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcastLiked = await readUsersPodcastLiked(param)
        return reply.code(200).send(podcastLiked)
    } catch (error) {
        return reply.code(400).send(error);
    }
}