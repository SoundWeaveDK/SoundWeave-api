import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastViewedReqestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1),
})

const podcastViewedResponseSchema = z.array(
    z.object({
        fk_podcast_id: z.object({
            id: z.number(),
            podcast_name: z.string(),
        })
    })
)

const addPodcastViewedRequestSchema = z.object({
    userId: z.number(),
    podcastId: z.number(),
})

const addPodcastViewedResponesSchema = z.object({})

const deletePodcastViewedRequest = z.object({
    id: z.number(),
})

const deleteAllPodcastViewedRequest = z.object({
    userId: z.number(),
})

const models = {
    podcastViewedReqestSchema,
    podcastViewedResponseSchema,
    addPodcastViewedRequestSchema,
    addPodcastViewedResponesSchema,
    deletePodcastViewedRequest,
    deleteAllPodcastViewedRequest
}

export type PodcastViewed = z.infer<typeof podcastViewedReqestSchema>
export type AddPodcastViewed = z.infer<typeof addPodcastViewedRequestSchema>
export type DeletePodcastViewed = z.infer<typeof deletePodcastViewedRequest>
export type DeleteAllPodcastViewed = z.infer<typeof deleteAllPodcastViewedRequest>
export const { schemas: podcastViewedSchema, $ref } = buildJsonSchemas(models, { $id: "podcastviewedSchemas" })