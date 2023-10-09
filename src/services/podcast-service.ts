import prisma from "../utils/orm-connection";
import { PodcastCreateInput, ReadSinglePodcastSchema, deletePodcastSchema } from "../schemas/podcast-schemas";

export async function createPodcast(input: PodcastCreateInput) {
    return await prisma.podcast.create({
        data: {
            userId: input.userId,
            podcast_name: input.podcast_name,
            podcast_file: input.podcast_file
        }
    });
}


export async function findSinglePodcast(input: ReadSinglePodcastSchema) {
    return await prisma.podcast.findUnique({
        where: {
            id: input.id
        },
        include: {
            Comment: {
                where: {
                    podcastId: input.id
                }
            }
        }
    })
}


export async function updatePodcast(input: PodcastCreateInput) {
    return await prisma.podcast.update({
        where: {
            id: input.userId,
        },
        data: {
            podcast_name: input.podcast_name,
            podcast_file: input.podcast_file,
        },
    });
}

export async function deletePodcast(input: deletePodcastSchema) {
    return await prisma.podcast.delete({
        where: {
            id: input.id,
        },
    });
}