import prisma from "../utils/ormConnection";
import { ReadCountry } from "../schemas/country-schema";


export async function findCountry() {
    return await prisma.country.findMany()
}