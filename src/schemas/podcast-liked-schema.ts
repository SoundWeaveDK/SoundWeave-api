import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastLikedReqestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1)
})


const podcastLikedResponseSchema = z.object({
    fk_podcast_id: z.object({
        podcast_name: z.string(),
    })
})

const models = {
    podcastLikedReqestSchema,
    podcastLikedResponseSchema
}

export type PodcastLiked = z.infer<typeof podcastLikedReqestSchema>
export const { schemas: podcastLikedSchema, $ref } = buildJsonSchemas(models, { $id: "podcastLikeSchemas" })