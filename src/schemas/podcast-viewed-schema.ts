import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastViewedReqestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1)
})

const podcastViewedResponseSchema = z.array(
    z.object({
        fk_podcast_id: z.object({
            podcast_name: z.string(),
        })
    })
)

const addPodcastViewedRequestSchema = z.object({
    userId: z.number(),
    podcastId: z.number(),
})

const addPodcastViewedResponesSchema = z.object({

})



const models = {
    podcastViewedReqestSchema,
    podcastViewedResponseSchema,
    addPodcastViewedRequestSchema,
    addPodcastViewedResponesSchema
}

export type PodcastViewed = z.infer<typeof podcastViewedReqestSchema>
export type AddPodcastViewed = z.infer<typeof addPodcastViewedRequestSchema>
export const { schemas: podcastViewedSchema, $ref } = buildJsonSchemas(models, { $id: "podcastviewedSchemas" })