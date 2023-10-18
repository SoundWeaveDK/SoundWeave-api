import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const userCore = {
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email("Invalid email address"),
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }).min(3),
  profilePicture: z.string().optional(),
}

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8),
  birthday: z.string({
    required_error: "Birthday is required",
    invalid_type_error: "Birthday must be a date",
  }),
  countryId: z.number({
    required_error: "Country is required",
    invalid_type_error: "Country must be a string",
  }),
  genderId: z.number({
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),
  profilePicture: z.string().optional(),
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
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    birthday: z.string(),
    countryId: z.string(),
    genderId: z.string(),
    createdAt: z.date(),
    profile_picture: z.string().optional(),
    fk_country_id: z.object({
      country_name: z.string(),
    }),
    fk_gender_id: z.object({
      gender_name: z.string(),
    }),
  })
});



const updateUserRequestSchema = z.object({
  userId: z.number(),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3),
  password: z.string().min(8).optional(),
  birthday: z.string(),
  countryId: z.number().optional(),
  genderId: z.number().optional(),
  profilePicture: z.string().optional(),

})


const updateUserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string().min(3),
  birthday: z.string(),
  countryId: z.number(),
  genderId: z.number(),
  profile_picture: z.string(),
  fk_country_id: z.object({
    country_name: z.string(),
  }),
  fk_gender_id: z.object({
    gender_name: z.string(),
  })
})



const readSingleUserRequestSchema = z.object({
  userId: z.number({
    required_error: "User id is required",
    invalid_type_error: "User id must be a int",
  }),
});

const readSingleUserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  birthday: z.date(),
  countryId: z.number(),
  genderId: z.number(),
  profile_picture: z.string(),
  fk_country_id: z.object({
    country_name: z.string(),
  }),
  fk_gender_id: z.object({
    gender_name: z.string(),
  })
})




const models = {
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  updateUserRequestSchema,
  updateUserResponseSchema,
  readSingleUserRequestSchema,
  readSingleUserResponseSchema,
}



export type UserCreateInput = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserRequestSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ReadSingleUser = z.infer<typeof readSingleUserRequestSchema>
export const { schemas: userSchema, $ref } = buildJsonSchemas(models, { $id: "userSchemas" })