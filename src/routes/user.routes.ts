import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler, getUsershandler } from "../controllers/user.controller";
import { $ref } from "../schemas/userSchema";

async function userRoutes(server: FastifyInstance) {
    server.post(
        "/registerUser",
        {
            schema: {
                body: $ref("createUserSchema"),
                response: {
                    201: $ref("createUserResponseSchema"),
                },
            },
        },
        registerUserHandler
    );

    server.post(
        "/login",
        {
            schema: {
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema'),
                },
            },
        },
        loginHandler
    );

    server.get(
        "/getusers",
        {
            preHandler: [server.authenticate]
        },
        getUsershandler
    );
}

export default userRoutes;
