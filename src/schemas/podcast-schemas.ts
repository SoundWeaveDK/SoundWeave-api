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
    description: z.string().optional(),
    thumbnail: z.string({
        required_error: "Thumbnail is required",
        invalid_type_error: "Thumbnail must be a string",
    }),
    createdAt: z.string().optional(),
}

const podcastStatistics = {
    views: z.bigint().optional(),
    likes: z.bigint().optional(),
    money: z.number().optional(),
}

// CREATE
const createPodcastRequestSchema = z.object({
    ...podcastCore
});

const createPodcastResponseSchema = z.object({
    id: z.number(),
    ...podcastCore,
    ...podcastStatistics
});
// CREATE END

// READ
const podcastRequestSchema = z.object({
    id: z.number({
        required_error: "Podcast id is required",
        invalid_type_error: "Podcast name must be a number",
    }),
});

const podcastResponseSchema = z.object({
    id: z.number(),
    ...podcastCore,
    ...podcastStatistics,
    fk_user_id: z.object({
        username: z.string(),
    }),
});

const multiplePodcastResponseSchema = z.array(podcastResponseSchema);
// READ END


// UPDATE
// File and thumbnail should not be updated
const updatePodcastRequestSchema = z.object({
    podcast_name: z.string().optional(),
    //podcast_file: z.string().optional(),
    description: z.string().optional(),
    //thumbnail: z.string().optional(),
});

const updatePodcastResponseSchema = z.object({
    id: z.number(),
    ...podcastCore,
    ...podcastStatistics,
});

// UPDATE END


// DELETE
const deletePodcastRequestSchema = z.object({
    id: z.number({
        required_error: "Podcast id is required",
        invalid_type_error: "Podcast name must be a number",
    }),
});

// DELETE END

const models = {
    createPodcastRequestSchema,
    createPodcastResponseSchema,
    podcastRequestSchema,
    podcastResponseSchema,
    updatePodcastRequestSchema,
    updatePodcastResponseSchema,
    deletePodcastRequestSchema,
    multiplePodcastResponseSchema
};

export type PodcastRequestSchema = z.infer<typeof podcastRequestSchema>
export type CreatePodcastRequestSchema = z.infer<typeof createPodcastRequestSchema>
export type UpdatePodcastRequestSchema = z.infer<typeof updatePodcastRequestSchema>
export type PodcastResponseSchema = z.infer<typeof podcastResponseSchema>
export type DeletePodcastRequestSchema = z.infer<typeof deletePodcastRequestSchema>

export const { schemas: podcastSchema, $ref } = buildJsonSchemas(models, { $id: "podcastSchemas" })




