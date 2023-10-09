import prisma from "../utils/orm-connection";
import { PodcastCreateInput, podcastSchema, deletePodcastSchema } from "../schemas/podcast-schemas";

export async function createPodcast(input: PodcastCreateInput) {
    return await prisma.podcast.create({
        data: {
            userId: input.userId,
            podcast_name: input.podcast_name,
            podcast_file: input.podcast_file,
            description: input.description,
            thumbnail: input.thumbnail
        }
    });
}


export async function findSinglePodcast(input: podcastSchema) {
    return await prisma.podcast.findUnique({
        where: {
            id: input.id
        },
        // include: {
        //     fk_user_id: true,
        //     Podcast_liked_by_user: true,
        //     Podcast_viewed_by_user: true,
        //     Comment: {
        //         include: {
        //             fk_user_id: true,
        //             Comments_liked: true
        //         }
        //     }
        // }
    });
};

export async function getAllUsersFollowPodcasts(input: podcastSchema) {
    const followedUsers = await prisma.user.findMany({
        where: {
            followedBy: {
                some: {
                    id: Number(input.id)
                }
            }
        }
    })

    const followedUsersId = followedUsers.map((user) => {
        return user.id
    })

    return await prisma.podcast.findMany({
        where: {
            userId: {
                in: followedUsersId
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