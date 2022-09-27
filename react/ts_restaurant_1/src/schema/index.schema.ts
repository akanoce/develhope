import z, { object, string, number, infer, } from 'zod'

export type OrderModel = {
    id: number,
    userId: number,
    status: string,
    products: {
        productId: number,
        qty: number
    }[]
}

export const OrderSchema = object({
    id: number(),
    userId: number(),
    status: string(),
    products: object({
        productId: number(),
        qty: number()
    }).array()
})

// export const OrderType = z.inf<typeof OrderSchema>