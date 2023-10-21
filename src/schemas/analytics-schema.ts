import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const readPodcastAnalyticsRequest = z.object({
    podcastId: z.number()
})

const readPodcastAnalyticsResponse = z.array(
    z.object({
        fk_podcast_id: z.object({
            views: z.number(),
        }),
        fk_user_id: z.object({
            fk_country_id: z.object({
                country_name: z.string()
            }),
            fk_gender_id: z.object({
                gender_name: z.string()
            })
        })
    })
)


const addAnalytics = z.object({
    userId: z.number(),
    id: z.number()
})





const models = {
    addAnalytics,
    readPodcastAnalyticsRequest,
    readPodcastAnalyticsResponse

};


export type AddAnalytics = z.infer<typeof addAnalytics>
export type ReadPodcastAnalytics = z.infer<typeof readPodcastAnalyticsRequest>
export const { schemas: analyticsSchema, $ref } = buildJsonSchemas(models, { $id: "analyticsSchemas" })