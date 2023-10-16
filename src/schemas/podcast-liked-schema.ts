import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastLikedReqestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1)
})

const podcastLikedResponseSchema = z.array(
    z.object({
        fk_podcast_id: z.object({
            podcast_name: z.string(),
        })
    })
)

const addPodcastLikedRequestSchema = z.object({
    userId: z.number(),
    podcastId: z.number(),
})

const addPodcastLikedResponesSchema = z.object({

})



const models = {
    podcastLikedReqestSchema,
    podcastLikedResponseSchema,
    addPodcastLikedRequestSchema,
    addPodcastLikedResponesSchema
}

export type PodcastLiked = z.infer<typeof podcastLikedReqestSchema>
export type AddPodcastLiked = z.infer<typeof addPodcastLikedRequestSchema>
export const { schemas: podcastLikedSchema, $ref } = buildJsonSchemas(models, { $id: "podcastLikeSchemas" })