export type LoginResponse = {
    accessToken: string
    user: {
        email: string
        id: 1
    }

}

export type MenuModel = {
    id: number,
    name: string,
    price: number,
    img: string,
    category_id: number
}

export type CategoryModel = {
    id: number,
    name: string
}

export type OrderModel = {
    products: OrderItemModel[]
    id: number
}

export type OrderItemModel = {
    productId: number,
    qty: number
}
