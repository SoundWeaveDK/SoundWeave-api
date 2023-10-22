import prisma from "../utils/orm-connection";
import { AddAnalytics, ReadPodcastAnalytics } from "../schemas/analytics-schema";


export async function addAnalytics(input: AddAnalytics) {

    const doesEntryExist = await prisma.analytics.findFirst({
        where: {
            userId: input.userId,
            podcastId: input.podcastId
        }
    })

    if (!doesEntryExist) {
        return await prisma.analytics.create({
            data: {
                userId: input.userId,
                podcastId: input.podcastId
            }
        })
    }
}

export async function readPodcastAnalytics(input: ReadPodcastAnalytics) {
    return prisma.analytics.findMany({
        where: {
            podcastId: input.podcastId
        }, include: {
            fk_podcast_id: true,
            fk_user_id: {
                include: {
                    fk_country_id: {
                        select: {
                            country_name: true
                        }
                    }, fk_gender_id: {
                        select: {
                            gender_name: true
                        }
                    }
                }
            }
        }
    })
}
