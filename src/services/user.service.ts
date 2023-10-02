import prisma from "../utils/ormConnection";
import { passwordEncryption } from "../utils/encryption";
import { UserCreateInput } from "../schemas/userSchema";

export async function registerUser(input: UserCreateInput) {
  const hashPassword = passwordEncryption(input.password);
  return await prisma.user.create({
    data: {
      email: input.email,
      password: hashPassword,
      username: input.username,
      birthday: input.birthday,
      country: input.country,
      gender: input.gender,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
