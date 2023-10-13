import { FastifyInstance } from "fastify";
import { AddWatchLaterHandler, readUserWatchLaterHandler, deleteSingleWatchLaterHandler, deleteManyWatchLaterHandler } from "../controllers/watch-later-controller";
import { $ref } from "../schemas/watch-later-schema"

async function watchlaterRoutes(server: FastifyInstance) {
    server.get(
        "/read-users-watch-later/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("watchlaterRequestSchema"),
                response: {
                    201: $ref("watchlaterResponseSchema"),
                },
            },

        },
        readUserWatchLaterHandler
    );


    server.post(
        "/add-watch-later",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("addWatchLaterRequestSchema"),
                response: {
                    201: $ref("addWatchLaterResponseSchema"),
                },
            },

        },
        AddWatchLaterHandler
    );


    server.delete(
        "/delete-single-watch-later/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deleteSingleWatchLaterRequestSchema"),
            },

        },
        deleteSingleWatchLaterHandler
    );

    server.delete(
        "/delete-all-watch-later/:userId",
        {
            preHandler: [server.authenticate],
            schema: {
                params: $ref("deleteAllWatchLaterRequestSchema"),
            },

        },
        deleteManyWatchLaterHandler
    );


}

export default watchlaterRoutes;