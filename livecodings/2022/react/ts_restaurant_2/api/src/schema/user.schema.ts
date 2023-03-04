import { z, object, string, number } from 'zod'


export const createUserSchema = object({
    body: object({
        email: string().email(),
        password: string()
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>['body']