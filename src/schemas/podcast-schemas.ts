import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastCore = {
    podcast_name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    podcast_file: z.string({
        required_error: "Podcast name is required",
        invalid_type_error: "Podcast name must be a string",
    }),
    views: z.bigint().optional(),
    likes: z.bigint().optional(),
    money: z.number().optional(),
}


//Schema for when you get a request to create a podcast
const createPodcastSchema = z.object({
    ...podcastCore
});

//Schema for the response after you have created a podcast
const podcastResponseSchema = z.object({
    id: z.number(),
    podcast_name: z.string(),
    podcast_file: z.string(),
});

const models = {
    createPodcastSchema,
    podcastResponseSchema,
};


export type PodcastCreateInput = z.infer<typeof createPodcastSchema>

export const { schemas: podcastSchema, $ref } = buildJsonSchemas(models, { $id: "podcastSchemas" })




