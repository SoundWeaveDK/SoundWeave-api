import { FastifyInstance } from "fastify";
import { loginHandler, readSingleUserHandler, registerUserHandler, updateUserHandler } from "../controllers/user-controller";
import { $ref } from "../schemas/user-schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/register-user",
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
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.put(
    "/update-user",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateUserRequestSchema"),
        response: {
          200: $ref("updateUserResponseSchema"),
        },
      },
    },
    updateUserHandler
  );

  server.get(
    "/read-single-user/:userId",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $ref("readSingleUserRequestSchema"),
        response: {
          200: $ref("readSingleUserResponseSchema"),
        },
      },
    },
    readSingleUserHandler
  );


}

export default userRoutes;