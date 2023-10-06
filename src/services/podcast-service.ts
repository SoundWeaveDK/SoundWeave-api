import prisma from "../utils/ormConnection";
import { PodcastCreateInput } from "../schemas/podcast-schemas";

export async function createPodcast(input: PodcastCreateInput) {
    return await prisma.podcast.create({
        data: {
            podcast_name: input.podcast_name,
            views: input.views,
            likes: input.likes,
            money: input.money,
            podcast_file: input.podcast_file
        }
    });
}