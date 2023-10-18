import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const watchlaterRequestSchema = z.object({
    userId: z.number({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1)
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