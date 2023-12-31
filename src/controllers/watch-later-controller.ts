import { FastifyReply, FastifyRequest } from "fastify";
import { addPodcastToWatchLater, deleteAllPodcastFromWatchLater, deleteSinglePodcastFromWatchLater, readUsersWatchLater } from "../services/watch-later-service";
import { Watchlater, AddWatchlater, DeleteSingleWatchlater, DeleteAllWatchlater } from "../schemas/watch-later-schema";
import { AddSasUrlToBlobs, GetSingleImage, GetSinglePodcast } from "../utils/azure-storage";


export async function readUserWatchLaterHandler(request: FastifyRequest<{ Params: Watchlater }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const watchlater = await readUsersWatchLater(param)

        return reply.code(200).send(await AddSasUrlToBlobs(watchlater))
    } catch (error) {
        return reply.code(400).send(error);
    }
}

export async function AddWatchLaterHandler(request: FastifyRequest<{ Body: AddWatchlater }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const watchlater = await addPodcastToWatchLater(body)

        try {
            const [thumbnailUrl, podcastFileUrl] = await Promise.all([
                GetSingleImage(watchlater.fk_podcast_id.thumbnail),
                GetSinglePodcast(watchlater.fk_podcast_id.podcast_file)
            ]);

            watchlater.fk_podcast_id.thumbnail = thumbnailUrl;
            watchlater.fk_podcast_id.podcast_file = podcastFileUrl;
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }
        return reply.code(200).send(watchlater)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function deleteSingleWatchLaterHandler(request: FastifyRequest<{ Params: DeleteSingleWatchlater }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const deletewatchlater = await deleteSinglePodcastFromWatchLater(param)
        return reply.code(200).send(deletewatchlater)
    } catch (error) {
        return reply.code(400).send(error);
    }
}

export async function deleteManyWatchLaterHandler(request: FastifyRequest<{ Params: DeleteAllWatchlater }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const deletAllewatchlater = await deleteAllPodcastFromWatchLater(param)
        return reply.code(200).send(deletAllewatchlater)
    } catch (error) {
        return reply.code(400).send(error);
    }
}