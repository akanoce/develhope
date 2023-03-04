
import { z, string, number, date, boolean, object } from 'zod'

export const menuCategorySchema = z.object({
    id: number(),
    name: string()
})

export const menuItemSchema = z.object({
    id: number(),
    name: string(),
    price: number(),
    img: string(),
    category_id: number()
})

export const productInOrderSchema = object({
    productId: number(),
    qty: number()
})

export const orderSchema = object({
    userId: number().or(string()).optional(),
    status: number().or(string()).optional(),
    products: productInOrderSchema.array(),
    id: number()
})

export type MenuCategoryModel = z.infer<typeof menuCategorySchema>
export type MenuItemModel = z.infer<typeof menuItemSchema>
export type ProductInOrderModel = z.infer<typeof productInOrderSchema>
export type OrderModel = z.infer<typeof orderSchema>

