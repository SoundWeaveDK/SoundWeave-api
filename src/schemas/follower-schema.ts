import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const followerRequestSchema = z.object({
    followerId: z.number(),
    followingId: z.number()
})

const followResponseSchema = z.object({
    username: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
})

const readUsersfollowerRequestSchema = z.object({
    userId: z.number(),
})


const readUsersfollowerResponseSchema = z.object({
    following: z.array(
        z.object({
            id: z.number(),
            username: z.string(),
        })
    )
})

const models = {
    followerRequestSchema,
    followResponseSchema,
    readUsersfollowerRequestSchema,
    readUsersfollowerResponseSchema
}



export type FollowerSchema = z.infer<typeof followerRequestSchema>
export type ReadUserFollowerSchema = z.infer<typeof readUsersfollowerRequestSchema>

export const { schemas: followerSchema, $ref } = buildJsonSchemas(models, { $id: "followerSchemas" })