import prisma from "../utils/orm-connection";
import { PodcastViewed, AddPodcastViewed } from "../schemas/podcast-viewed-schema";

export async function readUsersPodcastViewed(input: PodcastViewed) {
    return prisma.podcast_viewed_by_user.findMany({
        where: {
            userId: Number(input.userId)
        },
        include: {
            fk_podcast_id: true
        }

    })
}


export async function addPodcastToViewed(input: AddPodcastViewed) {
    return prisma.podcast_viewed_by_user.create({
        data: {
            userId: input.userId,
            podcastId: input.podcastId
        }
    })
}