import { FastifyReply, FastifyRequest } from "fastify";
import { findGender } from "../services/gender-service";

export async function readGenderHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const gender = await findGender();
        return reply.code(200).send(gender);
    } catch (error) {
        reply.code(400).send(error);
    }
}