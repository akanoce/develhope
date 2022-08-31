export type MenuCategory = {
    id: number
    name: string
}

export type MenuItem = {
    id: number
    name: string
    price: number
    img: string
    category_id: number
}

export type Order = {
    userId: number,
    status: number,
    products: ProductInOrder[],
    id: number
}

export type ProductInOrder = {
    productId: number,
    qty: number
}