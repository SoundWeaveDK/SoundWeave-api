import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetSingleImage, GetSinglePodcast } from "../utils/azure-storage";

async function azureStorageRoutes(server: FastifyInstance) {
  server.post(
    "/storagetest",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            filename: { type: "string" },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body: any = request.body;
      const image = await GetSingleImage(body.filename);
      return reply.code(200).send(image);
    }
  );
}

export default azureStorageRoutes;
