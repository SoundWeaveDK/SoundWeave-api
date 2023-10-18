import prisma from "../utils/orm-connection";
import { Watchlater, AddWatchlater, DeleteSingleWatchlater, DeleteAllWatchlater } from "../schemas/watch-later-schema";

export async function readUsersWatchLater(input: Watchlater) {
    return prisma.watch_later.findMany({
        where: {
            userId: Number(input.userId)
        },
        include: {
            fk_podcast_id: true,
            fk_user_id: {
                select: {
                    username: true
                }
            }
        }

    })
}


export async function addPodcastToWatchLater(input: AddWatchlater) {
    return prisma.watch_later.create({
        data: {
            podcastId: input.podcastId,
            userId: input.userId
        }
    })
}


export async function deleteSinglePodcastFromWatchLater(input: DeleteSingleWatchlater) {
    return prisma.watch_later.delete({
        where: {
            id: input.id
        }
    })
}


export async function deleteAllPodcastFromWatchLater(input: DeleteAllWatchlater) {
    return prisma.watch_later.deleteMany({
        where: {
            userId: input.userId
        }
    })
}