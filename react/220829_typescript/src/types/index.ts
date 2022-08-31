export type MenuItemModel = {
    id: number,
    name: string,
    price: string,
    img: string
    category_id: number
}

export type MenuCategoryModel = {
    id: number,
    name: string
}

export type OrderModel = {
    id: number,
    userId: number,
    status: string,
    products: {
        productId: number,
        qty: number
    }[]
}