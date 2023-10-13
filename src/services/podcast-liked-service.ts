import prisma from "../utils/orm-connection";
import { PodcastLiked } from "../schemas/podcast-liked-schema"

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