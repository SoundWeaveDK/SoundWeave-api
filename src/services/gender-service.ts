import prisma from "../utils/orm-connection";
import { ReadGender } from "../schemas/gender-schema";


export async function findGender() {
    return await prisma.gender.findMany()
}