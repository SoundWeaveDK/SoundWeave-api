import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  GetSingleImage,
  GetSinglePodcast,
  UploadImageSasToken,
  UploadPodcastSasToken,
} from "../utils/azure-storage";

async function azureStorageRoutes(server: FastifyInstance) {
  server.post(
    "/getimage",
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
      try {
        const image = await GetSingleImage(body.filename);
        return reply.code(200).send(image);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );

  server.post(
    "/getpodcast",
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
      try {
        const podcast = await GetSinglePodcast(body.filename);
        return reply.code(200).send(podcast);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );

  server.post(
    "/getuploadimagesastoken",
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
      try {
        const sasToken = await UploadImageSasToken(body.filename);
        return reply.code(200).send(sasToken);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );

  server.post(
    "/getuploadpodcastsastoken",
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
      try {
        const sasToken = await UploadPodcastSasToken(body.filename);
        return reply.code(200).send(sasToken);
      } catch (err: any) {
        return reply.code(404).send(err.message);
      }
    }
  );
}

export default azureStorageRoutes;
