export type MenuCategoryModel = {
    id: number
    name: string
}

export type MenuItemModel = {
    id: number
    name: string
    price: number
    img: string
    category_id: number
}

export type OrderModel = {
    userId: number,
    status: number,
    products: ProductInOrderModel[],
    id: number
}

export type ProductInOrderModel = {
    productId: number,
    qty: number
}