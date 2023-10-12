import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const watchlaterRequestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1)
})

const watchlaterResponseSchema = z.object({
    fk_podcast_id: z.object({
        podcast_name: z.string(),
        views: z.number(),
        likes: z.number(),
        money: z.number(),
        description: z.string(),
        podcast_file: z.string(),
        thumbnail: z.string(),
    })
})


const addWatchLaterRequestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }),
    podcastId: z.number({
        required_error: "Podcast id is required",
        invalid_type_error: "Podcast id must be a int",
    })
})


const addWatchLaterResponseSchema = z.object({
    id: z.number()
})


const deleteSingleWatchLaterRequestSchema = z.object({
    id: z.number(),
})

const deleteAllWatchLaterRequestSchema = z.object({
    userId: z.number(),
})

const models = {
    watchlaterRequestSchema,
    watchlaterResponseSchema,
    addWatchLaterRequestSchema,
    addWatchLaterResponseSchema,
    deleteSingleWatchLaterRequestSchema,
    deleteAllWatchLaterRequestSchema
}



export type Watchlater = z.infer<typeof watchlaterRequestSchema>
export type AddWatchlater = z.infer<typeof addWatchLaterRequestSchema>
export type DeleteSingleWatchlater = z.infer<typeof deleteSingleWatchLaterRequestSchema>
export type DeleteAllWatchlater = z.infer<typeof deleteAllWatchLaterRequestSchema>
export const { schemas: watchlaterSchema, $ref } = buildJsonSchemas(models, { $id: "watchlaterSchemas" })