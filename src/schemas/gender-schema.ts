import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const readGenderResponseSchema = z.object({
    id: z.number(),
    gender_name: z.string()
});

const readGenderReqestSchema = z.object({});


const models = {
    readGenderResponseSchema,
    readGenderReqestSchema
};

export type ReadGender = z.infer<typeof readGenderResponseSchema>
export const { schemas: genderSchema, $ref } = buildJsonSchemas(models, { $id: "genderSchemas" })