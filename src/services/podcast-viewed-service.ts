import prisma from "../utils/orm-connection";
import { PodcastViewed, AddPodcastViewed, DeletePodcastViewed, DeleteAllPodcastViewed } from "../schemas/podcast-viewed-schema";

export async function readUsersPodcastViewed(input: PodcastViewed) {
    return prisma.podcast_viewed_by_user.findMany({
        where: {
            userId: Number(input.userId)
        },
        include: {
            fk_podcast_id: {
                include: {
                    fk_user_id: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }

    })
}


export async function addPodcastToViewed(input: AddPodcastViewed) {
    await prisma.podcast.update({
        where: {
            id: input.podcastId,
        },
        data: {
            views: {
                increment: 1
            }
        }
    })


    return await prisma.podcast_viewed_by_user.create({
        data: {
            userId: input.userId,
            podcastId: input.podcastId,

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