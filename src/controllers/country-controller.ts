import { FastifyReply, FastifyRequest } from "fastify";
import { findCountry } from "../services/country-service";

export async function readCountryHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const country = await findCountry();
        return reply.code(200).send(country);
    } catch (error) {
        reply.code(400).send(error);
    }
}