import { FastifyInstance } from "fastify";
import { readCountryHandler } from "../controllers/country-controller";
import { $ref } from "../schemas/country-schema";

async function countryRoutes(server: FastifyInstance) {
    server.get(
        "/read-countrys",
        {
            schema: {
                response: {
                    200: $ref("readCountryResponseSchema"),
                },
            },

        },
        readCountryHandler
    );
}

export default countryRoutes;
