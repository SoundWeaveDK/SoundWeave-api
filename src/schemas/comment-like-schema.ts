import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const addCommentLikeRequestSchema = z.object({
    userId: z.number(),
    commentId: z.number()
})

const addCommentLikeResponseSchema = z.object({

})

const deleteCommentLikeRequestSchema = z.object({
    id: z.number()
})


const models = {
    addCommentLikeRequestSchema,
    addCommentLikeResponseSchema,
    deleteCommentLikeRequestSchema

};

export type AddCommentLike = z.infer<typeof addCommentLikeRequestSchema>
export type DeleteCommentLike = z.infer<typeof deleteCommentLikeRequestSchema>
export const { schemas: commentLikeSchema, $ref } = buildJsonSchemas(models, { $id: "commentLikeSchemas" })