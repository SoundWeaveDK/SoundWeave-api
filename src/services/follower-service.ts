import prisma from "../utils/orm-connection";
import { FollowerSchema, ReadUserFollowerSchema } from "../schemas/follower-schema";

export async function followAUser(input: FollowerSchema) {
    return prisma.user.update({
        where: {
            id: Number(input.followerId)
        },
        data: {
            following: {
                connect: {
                    id: Number(input.followingId)
                }
            }
        }
    })
}


export async function unfollowAUser(input: FollowerSchema) {
    return prisma.user.update({
        where: {
            id: Number(input.followerId)
        },
        data: {
            following: {
                disconnect: {
                    id: Number(input.followingId)
                }
            }
        }
    })
}


export async function readUsersfollowers(input: ReadUserFollowerSchema) {
    return prisma.user.findMany({
        where: {
            id: Number(input.userId)
        },
        include: {
            following: true,
        }
    })
}