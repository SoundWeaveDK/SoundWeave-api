import { FastifyInstance } from "fastify";
import { userFollowHandler, userUnFollowHandler } from "../controllers/follower-controller";
import { $ref } from "../schemas/follower-schema";


async function followRoutes(server: FastifyInstance) {
    server.put(
        "/follow-user",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("followerRequestSchema"),
                response: {
                    201: $ref("followResponseSchema"),
                },
            },

        },
        userFollowHandler
    );

    server.put(
        "/unfollow-user",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("followerRequestSchema"),
                response: {
                    201: $ref("followResponseSchema"),
                },
            },

        },
        userUnFollowHandler
    );

}

export default followRoutes;