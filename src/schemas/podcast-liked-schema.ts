import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const podcastLikedReqestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1),
})

const addPodcastLikedRequestSchema = z.object({
    userId: z.number(),
    podcastId: z.number(),
})

const addPodcastLikedResponesSchema = z.object({})


const deletePodcastLikedRequest = z.object({
    id: z.number(),
})



const models = {
    podcastLikedReqestSchema,
    addPodcastLikedRequestSchema,
    addPodcastLikedResponesSchema,
    deletePodcastLikedRequest
}

export type PodcastLiked = z.infer<typeof podcastLikedReqestSchema>
export type AddPodcastLiked = z.infer<typeof addPodcastLikedRequestSchema>
export type DeletePodcastLiked = z.infer<typeof deletePodcastLikedRequest>
export const { schemas: podcastLikedSchema, $ref } = buildJsonSchemas(models, { $id: "podcastLikeSchemas" })