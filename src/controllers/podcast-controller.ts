import { FastifyReply, FastifyRequest } from "fastify";
import { createPodcast } from "../services/podcast-service";
import { PodcastCreateInput } from "../schemas/podcast-schemas";

export async function createPodcastHandler(
    request: FastifyRequest<{ Body: PodcastCreateInput }>,
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const podcast = await createPodcast(body);
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}