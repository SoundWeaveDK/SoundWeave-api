import { FastifyReply, FastifyRequest } from "fastify";
import { findUserByEmail, readSingleUser, registerUser, updateUser } from "../services/user-service";
import { LoginInput, UserCreateInput, UpdateUser, ReadSingleUser } from "../schemas/user-schema";
import { verifyPassword } from "../utils/encryption";
import { jwt } from "../plugins/fastify-jwt";
import { GetSingleImage } from "../utils/azure-storage";


export async function registerUserHandler(
  request: FastifyRequest<{ Body: UserCreateInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await registerUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    return reply.code(400).send(error);
  }
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  const body = request.body;
  try {
    const user = await findUserByEmail(body.email);

    if (user?.profile_picture != null) {
      const profile_picture = await GetSingleImage(user.profile_picture)
      user.profile_picture = profile_picture
    }

    if (!user) {
      return reply.code(401).send({
        messages: "User doesn't exist",
      });
    }

    if (body.password.length == 0) {
      return reply.code(400).send({
        messages: "Missing password",
      });
    }

    const checkpassword = verifyPassword(body.password, user.password);

    if (checkpassword) {
      const accessToken = jwt.sign({ userId: user.id, expiresIn: '10d' });
      return reply.code(200).send({ accessToken, user });
    } else {
      return reply.code(401).send({
        messages: "Wrong password",
      });
    }
  } catch (error) {
    return reply.code(401).send({
      messages: "Invalid user or password",
    });
  }

}

export async function updateUserHandler(request: FastifyRequest<{ Body: UpdateUser }>, reply: FastifyReply) {
  const body = request.body;
  try {
    const user = await updateUser(body);

    if (user?.profile_picture != null) {
      const profile_picture = await GetSingleImage(user.profile_picture)
      user.profile_picture = profile_picture
    }
    return reply.code(200).send(user)
  } catch (error) {
    return reply.code(400).send(error);
  }
}


export async function readSingleUserHandler(request: FastifyRequest<{ Params: ReadSingleUser }>, reply: FastifyReply) {
  const param = request.params;
  try {
    const user = await readSingleUser(param)
    try {
      if (user?.profile_picture != null) {
        const profile_picture = await GetSingleImage(user.profile_picture)
        user.profile_picture = profile_picture
      }
    }
    catch (err) {
      return reply.code(404).send({
        messages: "Thumbnail or podcast file not found"
      });
    }
    return reply.code(200).send(user)
  } catch (error) {
    return reply.code(400).send(error);
  }
}