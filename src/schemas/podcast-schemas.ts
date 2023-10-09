import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const podcastCore = {
    userId: z.number({
        required_error: "UserId id is required",
        invalid_type_error: "UserId name must be a number",
    }),
    podcast_name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    podcast_file: z.string({
        required_error: "Podcast name is required",
        invalid_type_error: "Podcast name must be a string",
    }),
}


const podcastStatistics = {
    views: z.bigint().optional(),
    likes: z.bigint().optional(),
    money: z.number().optional(),
}


//Schemas for request and respones on create a podcast
const createPodcastRequestSchema = z.object({
    ...podcastCore
});


const createPodcastResponseSchema = z.object({
    id: z.number(),
    podcast_name: z.string(),
    podcast_file: z.string(),
});


//Schemas for request and respones on get a single podcast
const readSinglePodcastRequestSchema = z.object({
    id: z.number({
        required_error: "Podcast id is required",
        invalid_type_error: "Podcast name must be a number",
    }),
});

const readSinglePodcastResponseSchema = z.object({
    id: z.number(),
    ...podcastCore,
    ...podcastStatistics,
});



//Schemas for request and respones on update a podcast
const updatePodcastRequestSchema = z.object({
    ...podcastCore,
});

const updatePodcastResponseSchema = z.object({
    id: z.number(),
    ...podcastCore,
});


//Schemas for request and respones on deleting a podcast
const deletePodcastRequestSchema = z.object({
    id: z.number({
        required_error: "Podcast id is required",
        invalid_type_error: "Podcast name must be a number",
    }),
});

const models = {
    createPodcastRequestSchema,
    createPodcastResponseSchema,
    readSinglePodcastRequestSchema,
    readSinglePodcastResponseSchema,
    updatePodcastRequestSchema,
    updatePodcastResponseSchema,
    deletePodcastRequestSchema,
};


export type PodcastCreateInput = z.infer<typeof createPodcastRequestSchema>
export type ReadSinglePodcastSchema = z.infer<typeof readSinglePodcastResponseSchema>
export type deletePodcastSchema = z.infer<typeof deletePodcastRequestSchema>

export const { schemas: podcastSchema, $ref } = buildJsonSchemas(models, { $id: "podcastSchemas" })




