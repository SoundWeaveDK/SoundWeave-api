import prisma from "../utils/ormConnection";
import { PodcastCreateInput } from "../schemas/podcast-schemas";

export async function createPodcast(input: PodcastCreateInput) {
    return await prisma.podcast.create({
        data: {
            podcast_name: input.name,
            views: BigInt(input.views),
            likes: BigInt(input.likes),
            money: Number(input.money),
            filename: input.file_name
        }
    });
}