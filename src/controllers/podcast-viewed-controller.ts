import { FastifyReply, FastifyRequest } from "fastify";
import { readUsersPodcastViewed, addPodcastToViewed } from "../services/podcast-viewed-service";
import { PodcastViewed, AddPodcastViewed } from "../schemas/podcast-viewed-schema";


export async function readUsersPodcastViewedHandler(request: FastifyRequest<{ Params: PodcastViewed }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcastLiked = await readUsersPodcastViewed(param)
        return reply.code(200).send(podcastLiked)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function addPodcastViewed(request: FastifyRequest<{ Body: AddPodcastViewed }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const addPodcastLike = await addPodcastToViewed(body);
        return reply.code(200).send(addPodcastLike)
    } catch (error) {
        return reply.code(400).send(error);
    }
}