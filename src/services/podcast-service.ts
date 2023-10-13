import prisma from "../utils/orm-connection";
import { PodcastCreateInput, PodcastResponseSchema, DeletePodcastSchema, PodcastUpdateInput } from "../schemas/podcast-schemas";
import { Podcast } from "@prisma/client";

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


export async function findSinglePodcast(input: PodcastResponseSchema) {
    return await prisma.podcast.findUnique({
        where: {
            id: input.id
        },
        include: {
            fk_user_id: true
        }
    });
};

export async function getAllUsersFollowPodcasts(input: PodcastResponseSchema) {
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
        },
        include: {
            fk_user_id: true
        }
    })
}

export async function getAllUserPodcasts(input: PodcastResponseSchema) {
    return await prisma.podcast.findMany({
        where: {
            userId: {
                in: [Number(input.id)]
            }
        },
        include: {
            fk_user_id: true
        }
    })
}

export async function getPreviewPodcasts() {
    const randomPodcastIds: any = await prisma.$queryRaw`
        SELECT id FROM Podcast
        ORDER BY RAND()
        LIMIT 15
    `;

    return await prisma.podcast.findMany({
        where: {
            id: {
                in: randomPodcastIds.map((podcast: any) => podcast.id)
            }
        },
        include: {
            fk_user_id: true
        }
    })
}



export async function updatePodcast(input: PodcastUpdateInput) {
    return await prisma.podcast.update({
        where: {
            id: input.id
        },
        data: {
            podcast_name: input.podcast_name,
            podcast_file: input.podcast_file,
            description: input.description,
            thumbnail: input.thumbnail
        }
    });

}

export async function deletePodcast(input: DeletePodcastSchema) {
    return await prisma.podcast.delete({
        where: {
            id: input.id,
        },
    });
}