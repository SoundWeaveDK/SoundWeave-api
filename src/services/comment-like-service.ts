import prisma from "../utils/orm-connection";
import { AddCommentLike, DeleteCommentLike } from "../schemas/comment-like-schema";

export async function addCommentLike(input: AddCommentLike) {
    return prisma.comments_liked.create({
        data: {
            userId: input.userId,
            commentId: input.commentId
        }
    })
}

export async function deleteCommentLike(input: DeleteCommentLike) {
    return prisma.comments_liked.delete({
        where: {
            id: input.id
        }
    })
}