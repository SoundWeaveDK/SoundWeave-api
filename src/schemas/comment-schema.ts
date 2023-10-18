import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const readPodcastCommentsRequestSchema = z.object({
    podcastId: z.number(),
});

const readPodcastCommnetResponseSchema = z.array(
    z.object({
        comment: z.string(),
        id: z.number(),
        fk_user_id: z.object({
            username: z.string(),
        }),
        _count: z.object({
            Comments_liked: z.number()
        })
    })
)

const addPodcastCommentRequestSchema = z.object({
    comment: z.string({
        required_error: "User id is required",
        invalid_type_error: "User id must be a int",
    }).min(1),
    userId: z.number(),
    podcastId: z.number()
})

const addPodcastCommentResponseSchema = z.object({
    id: z.number(),
    comment: z.string(),
    userId: z.number(),
    podcastId: z.number()
})

const deletePodcastCommentResponseSchema = z.object({
    id: z.number()
})


const models = {
    readPodcastCommentsRequestSchema,
    readPodcastCommnetResponseSchema,
    addPodcastCommentRequestSchema,
    addPodcastCommentResponseSchema,
    deletePodcastCommentResponseSchema
};

export type ReadPodcastComments = z.infer<typeof readPodcastCommentsRequestSchema>
export type AddPodcastComments = z.infer<typeof addPodcastCommentRequestSchema>
export type DeletePodcastComments = z.infer<typeof deletePodcastCommentResponseSchema>
export const { schemas: commentSchema, $ref } = buildJsonSchemas(models, { $id: "commentSchemas" })