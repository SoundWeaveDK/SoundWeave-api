import { FastifyReply, FastifyRequest } from "fastify";
import { readPodcastAnalytics } from "../services/analytics-service";
import { ReadPodcastAnalytics } from "../schemas/analytics-schema";


export async function readSinglePodcastAnalyticsHandler(request: FastifyRequest<{ Params: ReadPodcastAnalytics }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcastAnalytics = await readPodcastAnalytics(param)
        return reply.code(200).send(podcastAnalytics)
    } catch (error) {
        return reply.code(400).send(error);
    }
}