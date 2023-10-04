import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    }),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
    birthday: z.string({
        required_error: "Birthday is required",
        invalid_type_error: "Birthday must be a date",
    }),
    country: z.string({
        required_error: "Country is required",
        invalid_type_error: "Country must be a string",
    }),
    gender: z.string({
        required_error: "Gender is required",
        invalid_type_error: "Gender must be a string",
    })
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
})

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
    user: z.object({
        username: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        }),
    })
});

export type UserCreateInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export const { schemas: userSchema, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
})