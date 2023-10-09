import { FastifyInstance } from "fastify";
import { readGenderHandler } from "../controllers/gender-controller";
import { $ref } from "../schemas/gender-schema";

async function genderRoutes(server: FastifyInstance) {
    server.get(
        "/read-genders",
        readGenderHandler
    );
}

export default genderRoutes;
