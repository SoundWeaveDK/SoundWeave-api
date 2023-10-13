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


const models = {
    followerRequestSchema,
    followResponseSchema,
}



export type FollowerSchema = z.infer<typeof followerRequestSchema>

export const { schemas: followerSchema, $ref } = buildJsonSchemas(models, { $id: "followerSchemas" })