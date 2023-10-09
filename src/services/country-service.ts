import prisma from "../utils/orm-connection";
import { ReadCountry } from "../schemas/country-schema";


export async function findCountry() {
    return await prisma.country.findMany()
}