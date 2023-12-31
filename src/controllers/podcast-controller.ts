import { FastifyReply, FastifyRequest } from "fastify";
import { createPodcast, deletePodcast, findSinglePodcast, getAllUserPodcasts, getAllUsersFollowPodcasts, getExplorePodcasts, getPreviewPodcasts, updatePodcast } from "../services/podcast-service";
import { PodcastResponseSchema, UpdatePodcastRequestSchema, PodcastRequestSchema, DeletePodcastRequestSchema, CreatePodcastRequestSchema } from "../schemas/podcast-schemas";
import { GetSingleImage, GetSinglePodcast, GetMultipleImages, GetMultiplePodcasts, DeleteBlob } from "../utils/azure-storage";
import { AzureBlob } from "../interfaces/azure-blob";


export async function createPodcastHandler(request: FastifyRequest<{ Body: CreatePodcastRequestSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const podcast = await createPodcast(body);
        try {
            const [thumbnailUrl, podcastFileUrl] = await Promise.all([
                GetSingleImage(podcast.thumbnail),
                GetSinglePodcast(podcast.podcast_file)
            ]);

            podcast.thumbnail = thumbnailUrl;
            podcast.podcast_file = podcastFileUrl;
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}


export async function readSinglePodcastHandler(request: FastifyRequest<{ Params: PodcastResponseSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcast = await findSinglePodcast(param);
        if (podcast == null) {
            return reply.code(404).send({
                messages: "Podcast not found"
            });
        }
        try {
            const [thumbnailUrl, podcastFileUrl] = await Promise.all([
                GetSingleImage(podcast.thumbnail),
                GetSinglePodcast(podcast.podcast_file),
            ]);

            if (podcast.fk_user_id.profile_picture != null) {
                podcast.fk_user_id.profile_picture = await GetSingleImage(podcast.fk_user_id.profile_picture);
            }

            podcast.thumbnail = thumbnailUrl;
            podcast.podcast_file = podcastFileUrl;
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }

        return reply.code(200).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }
}

export async function readFollowingPodcastsHandler(request: FastifyRequest<{ Params: PodcastResponseSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcasts = await getAllUsersFollowPodcasts(param);
        if (podcasts == null) {
            return reply.code(404).send({
                messages: "Podcasts not found"
            });
        }
        const thumbnails = podcasts.map((podcast: any) => podcast.thumbnail)
        const podcast_files = podcasts.map((podcast: any) => podcast.podcast_file)

        try {
            const thumbnailBlobs = await GetMultipleImages(thumbnails);
            const podcastFileBlobs = await GetMultiplePodcasts(podcast_files);

            const thumbnailToBlobMap = new Map();
            thumbnailBlobs.forEach((blob: AzureBlob) => {
                thumbnailToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            const podcastFileToBlobMap = new Map();
            podcastFileBlobs.forEach((blob: AzureBlob) => {
                podcastFileToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            podcasts.forEach((podcast: any) => {
                if (thumbnailToBlobMap.has(podcast.thumbnail)) {
                    podcast.thumbnail = thumbnailToBlobMap.get(podcast.thumbnail);
                }
                if (podcastFileToBlobMap.has(podcast.podcast_file)) {
                    podcast.podcast_file = podcastFileToBlobMap.get(podcast.podcast_file);
                }
            });
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }

        return reply.code(200).send(podcasts);
    }
    catch (error) {
        reply.code(400).send(error);
    };
};

export async function readUserPodcastsHandler(request: FastifyRequest<{ Params: PodcastResponseSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcasts = await getAllUserPodcasts(param);
        if (podcasts == null) {
            return reply.code(404).send({
                messages: "Podcasts not found"
            });
        }

        const thumbnails = podcasts.map((podcast: any) => podcast.thumbnail)
        const podcast_files = podcasts.map((podcast: any) => podcast.podcast_file)

        try {
            const thumbnailBlobs = await GetMultipleImages(thumbnails);
            const podcastFileBlobs = await GetMultiplePodcasts(podcast_files);

            const thumbnailToBlobMap = new Map();
            thumbnailBlobs.forEach((blob: AzureBlob) => {
                thumbnailToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            const podcastFileToBlobMap = new Map();
            podcastFileBlobs.forEach((blob: AzureBlob) => {
                podcastFileToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            podcasts.forEach((podcast: any) => {
                if (thumbnailToBlobMap.has(podcast.thumbnail)) {
                    podcast.thumbnail = thumbnailToBlobMap.get(podcast.thumbnail);
                }
                if (podcastFileToBlobMap.has(podcast.podcast_file)) {
                    podcast.podcast_file = podcastFileToBlobMap.get(podcast.podcast_file);
                }
            });
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }

        return reply.code(200).send(podcasts);
    }
    catch (error) {
        reply.code(400).send(error);
    };
};

export async function readPreviewPodcastsHandler(request: FastifyRequest<{ Params: PodcastResponseSchema }>, reply: FastifyReply) {
    try {
        const podcasts: any = await getPreviewPodcasts();
        if (podcasts == null) {
            return reply.code(404).send({
                messages: "Podcasts not found"
            });
        }
        const thumbnails = podcasts.map((podcast: any) => podcast.thumbnail)

        try {
            const blobs = await GetMultipleImages(thumbnails);

            const thumbnailToBlobMap = new Map();
            blobs.forEach((blob: AzureBlob) => {
                thumbnailToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            podcasts.forEach((podcast: any) => {
                if (thumbnailToBlobMap.has(podcast.thumbnail)) {
                    podcast.thumbnail = thumbnailToBlobMap.get(podcast.thumbnail);
                }
            });
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }

        return reply.code(200).send(podcasts);
    } catch (error) {
        reply.code(400).send(error);
    }
};

export async function readExplorePodcastsHandler(request: FastifyRequest<{ Params: PodcastResponseSchema }>, reply: FastifyReply) {
    try {
        const podcasts: any = await getExplorePodcasts();
        if (podcasts == null) {
            return reply.code(404).send({
                messages: "Podcasts not found"
            });
        }

        const thumbnails = podcasts.map((podcast: any) => podcast.thumbnail)
        const podcast_files = podcasts.map((podcast: any) => podcast.podcast_file)

        try {
            const thumbnailBlobs = await GetMultipleImages(thumbnails);
            const podcastFileBlobs = await GetMultiplePodcasts(podcast_files);

            const thumbnailToBlobMap = new Map();
            thumbnailBlobs.forEach((blob: AzureBlob) => {
                thumbnailToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            const podcastFileToBlobMap = new Map();
            podcastFileBlobs.forEach((blob: AzureBlob) => {
                podcastFileToBlobMap.set(blob.blobName, blob.blobSasUri);
            });

            podcasts.forEach((podcast: any) => {
                if (thumbnailToBlobMap.has(podcast.thumbnail)) {
                    podcast.thumbnail = thumbnailToBlobMap.get(podcast.thumbnail);
                }
                if (podcastFileToBlobMap.has(podcast.podcast_file)) {
                    podcast.podcast_file = podcastFileToBlobMap.get(podcast.podcast_file);
                }
            });
        }
        catch (err) {
            return reply.code(404).send({
                messages: "Thumbnail or podcast file not found"
            });
        }

        return reply.code(200).send(podcasts);
    } catch (error) {
        reply.code(400).send(error);
    }
};

export async function updatePodcastHandler(request: FastifyRequest<{ Body: UpdatePodcastRequestSchema, Params: PodcastRequestSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const podcast = await updatePodcast(body, request.params);
        return reply.code(201).send(podcast);
    } catch (error) {
        reply.code(400).send(error);
    }

}

export async function deletePodcastHandler(request: FastifyRequest<{ Params: DeletePodcastRequestSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const podcast = await deletePodcast(param);
        await Promise.all([
            DeleteBlob("images", podcast.thumbnail),
            DeleteBlob("podcasts", podcast.podcast_file)
        ]);
        return reply.code(200).send();
    } catch (error) {
        reply.code(400).send(error);
    }

}