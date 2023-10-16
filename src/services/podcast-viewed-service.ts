import prisma from "../utils/orm-connection";
import { PodcastViewed, AddPodcastViewed, DeletePodcastViewed, DeleteAllPodcastViewed } from "../schemas/podcast-viewed-schema";

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


export async function deleteSinglePodcastFromViewed(input: DeletePodcastViewed) {
    return prisma.podcast_viewed_by_user.delete({
        where: {
            id: input.id
        }
    })
}

export async function deleteAllPodcastFromViewed(input: DeleteAllPodcastViewed) {
    return prisma.podcast_viewed_by_user.deleteMany({
        where: {
            userId: input.userId
        }
    })
}