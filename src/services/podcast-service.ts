import prisma from "../utils/orm-connection";
import { CreatePodcastRequestSchema, PodcastResponseSchema, DeletePodcastRequestSchema, UpdatePodcastRequestSchema, PodcastRequestSchema } from "../schemas/podcast-schemas";

export async function createPodcast(input: CreatePodcastRequestSchema) {
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


export async function findSinglePodcast(input: PodcastRequestSchema) {
    return await prisma.podcast.findUnique({
        where: {
            id: input.id
        }
    });
};

export async function getAllUsersFollowPodcasts(input: PodcastRequestSchema) {
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

export async function getAllUserPodcasts(input: PodcastRequestSchema) {
    return await prisma.podcast.findMany({
        where: {
            userId: {
                in: [Number(input.id)]
            }
        }
    })
}


export async function updatePodcast(input: UpdatePodcastRequestSchema, params: PodcastRequestSchema) {
    return await prisma.podcast.update({
        where: {
            id: params.id
        },
        data: {
            podcast_name: input.podcast_name,
            //podcast_file: input.podcast_file,
            description: input.description,
            //thumbnail: input.thumbnail
        }
    });

}

export async function deletePodcast(input: DeletePodcastRequestSchema) {
    return await prisma.podcast.delete({
        where: {
            id: input.id,
        },
    });
}