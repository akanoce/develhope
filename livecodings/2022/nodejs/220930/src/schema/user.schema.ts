import { number, object, string, z } from "zod";

export const createUserSchema = object({
    body: object({
        email: string(),
        name: string(),
        password: string()
    })
})

export const getUserSchema = object({
    params: object({
        id: string().transform(value => parseInt(value))
    })
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type GetUserType = z.infer<typeof getUserSchema>['params']