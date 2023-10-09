import { FastifyReply, FastifyRequest } from "fastify";
import { createPodcast, deletePodcast, findSinglePodcast, updatePodcast } from "../services/podcast-service";
import { PodcastCreateInput, ReadSinglePodcastSchema, deletePodcastSchema } from "../schemas/podcast-schemas";

export async function createPodcastHandler(request: FastifyRequest<{ Body: PodcastCreateInput }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const podcast = await createPodcast(body);
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}


export async function readSinglePodcastHandler(request: FastifyRequest<{ Params: ReadSinglePodcastSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcast = await findSinglePodcast(param);
        return reply.code(200).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }
}


export async function updatePodcastHandler(request: FastifyRequest<{ Body: PodcastCreateInput }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const podcast = await updatePodcast(body);
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}

export async function deletePodcastHandler(request: FastifyRequest<{ Params: deletePodcastSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcast = await deletePodcast(param);
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}