import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, } from "fastify";
import { addAnalytics } from "../services/analytics-service";
import { AddAnalytics } from "../schemas/analytics-schema";


declare module "fastify" {
    interface FastifyInstance {
        analytics: any;
    }
}


export default fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.decorate(
        "analytics",
        function (request: FastifyRequest<{ Body: AddAnalytics }>, reply: FastifyReply) {
            try {
                const bodyPodcast = request.body;
                addAnalytics(bodyPodcast);
            } catch (err) {
                reply.send(err);
            }
        }
    );
});