import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const readCountryResponseSchema = z.object({
    id: z.number(),
    country_name: z.string()
});


const models = {
    readCountryResponseSchema,
};

export type ReadCountry = z.infer<typeof readCountryResponseSchema>
export const { schemas: countrySchema, $ref } = buildJsonSchemas(models, { $id: "countrySchemas" })