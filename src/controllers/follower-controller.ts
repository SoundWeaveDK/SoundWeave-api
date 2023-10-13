import { FastifyReply, FastifyRequest } from "fastify";
import { followAUser, unfollowAUser } from "../services/follower-service";
import { FollowerSchema } from "../schemas/follower-schema";


export async function userFollowHandler(request: FastifyRequest<{ Body: FollowerSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const followUser = await followAUser(body)
        return reply.code(200).send(followUser)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function userUnFollowHandler(request: FastifyRequest<{ Body: FollowerSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const unfollowUser = await unfollowAUser(body)
        return reply.code(200).send(unfollowUser)
    } catch (error) {
        return reply.code(400).send(error);
    }
}