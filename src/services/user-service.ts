import prisma from "../utils/orm-connection";
import { passwordEncryption } from "../utils/encryption";
import { UserCreateInput } from "../schemas/user-schema";

export async function registerUser(input: UserCreateInput) {
  const hashPassword = passwordEncryption(input.password);
  return await prisma.user.create({
    data: {
      email: input.email,
      password: hashPassword,
      username: input.username,
      birthday: input.birthday,
      countryId: input.country,
      genderId: input.gender,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    }
  })
}


export async function findUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
}