import prisma from "../utils/orm-connection";
import { PodcastLiked, AddPodcastLiked, DeletePodcastLiked } from "../schemas/podcast-liked-schema"

export async function readUsersPodcastLiked(input: PodcastLiked) {
    return prisma.podcast_liked_by_user.findMany({
        where: {
            userId: Number(input.userId)
        },
        include: {
            fk_podcast_id: true
        }

    })
}


export async function addPodcastToliked(input: AddPodcastLiked) {
    await prisma.podcast.update({
        where: {
            id: input.podcastId
        }, data: {
            likes: {
                increment: 1
            }
        }
    })



    return await prisma.podcast_liked_by_user.create({
        data: {
            userId: input.userId,
            podcastId: input.podcastId
        }
    })
}


export async function deleteSinglePodcastFromLiked(input: DeletePodcastLiked) {
    await prisma.podcast.update({
        where: {
            id: input.id
        }, data: {
            likes: {
                decrement: 1
            }
        }
    })


    return await prisma.podcast_liked_by_user.delete({
        where: {
            id: input.id
        }
    })
}