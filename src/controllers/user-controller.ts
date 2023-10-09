import { FastifyReply, FastifyRequest } from "fastify";
import { findUserByEmail, registerUser, findUsers } from "../services/user-service";
import { LoginInput, UserCreateInput } from "../schemas/user-schema";
import { verifyPassword } from "../utils/encryption";
import { jwt } from "../plugins/fastify-jwt";


export async function registerUserHandler(
  request: FastifyRequest<{ Body: UserCreateInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await registerUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    reply.code(400).send(error);
  }
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  const body = request.body;
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      messages: "invalid email or password",
    });
  }

  const checkpassword = verifyPassword(body.password, user.password);

  if (checkpassword) {
    const accessToken = jwt.sign({ userId: user.id, expiresIn: '10d' });
    return reply.code(200).send({ accessToken, user });
  }

  return reply.code(401).send({
    messages: "invalid email or password",
  });
}


export async function getUsershandler() {
  const users = await findUsers();
  return users;
}