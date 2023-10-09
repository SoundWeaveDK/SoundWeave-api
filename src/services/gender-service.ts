import prisma from "../utils/ormConnection";
import { ReadGender } from "../schemas/gender-schema";


export async function findGender() {
    return await prisma.gender.findMany()
}