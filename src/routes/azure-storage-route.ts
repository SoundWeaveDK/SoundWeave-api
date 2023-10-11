import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  GetSingleImage,
  GetSinglePodcast,
  GetUploadSASURL,
} from "../utils/azure-storage";

async function azureStorageRoutes(server: FastifyInstance) {
  server.post(
    "/getimage",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            fileName: { type: "string" },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body: any = request.body;
      try {
        const image = await GetSingleImage(body.fileName);
        return reply.code(200).send(image);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );

  server.post(
    "/getuploadsastoken",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            fileName: { type: "string" },
            containerName: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              sasToken: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body: any = request.body;
      try {
        const sasToken = await GetUploadSASURL(body.containerName, body.fileName);
        return reply.code(200).send(sasToken);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );
}

export default azureStorageRoutes;
