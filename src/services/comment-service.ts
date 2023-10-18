import prisma from "../utils/orm-connection";
import { ReadPodcastComments, AddPodcastComments, DeletePodcastComments } from "../schemas/comment-schema";

export async function readUsersComment(input: ReadPodcastComments) {
    return prisma.comment.findMany({
        where: {
            podcastId: input.podcastId
        },
        include: {
            _count: {
                select: {
                    Comments_liked: true
                }
            },
            fk_user_id: {
                select: {
                    username: true
                }
            }
        }
    })
}

export async function addPodcastComments(input: AddPodcastComments) {
    return prisma.comment.create({
        data: {
            comment: input.comment,
            podcastId: input.podcastId,
            userId: input.userId
        }, include: {
            fk_user_id: {
                select: {
                    username: true
                }
            }
        }
    })
}


export async function deleteSinglePodcastComment(input: DeletePodcastComments) {
    return prisma.comment.delete({
        where: {
            id: input.id
        }
    })
}