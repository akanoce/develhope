import { useContext, useState } from "react"
import { OrderDialog } from "../components/dialog"
import { useData } from "../context/dataContext"
import useFetch from "../hooks/useFetch"
import { MenuCategoryModel, MenuItemModel, OrderModel } from "../types"

export default function Orders() {

    const { orders, ordersLoading, ordersError, menu, menuLoading, menuError, categories, categoriesLoading, categoriesError } = useData()

    return (<>
        {(ordersLoading || categoriesLoading || menuLoading) && <h1>Loading....</h1>}
        {(!!ordersError || !!categoriesError || !!menuError) && 'Errore di fetch'}
        <div className='menu_container'>
            {(orders && categories && menu) && orders.map(item => <OrderItem order={item} categories={categories} menu={menu} />)}
        </div>
    </>
    )
}


type ItemProps = {
    order: OrderModel,
    categories: MenuCategoryModel[],
    menu: MenuItemModel[]
}

export function OrderItem({ order, categories, menu }: ItemProps) {

    const invalidOrderItems = []
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const total = order.products.reduce((acc, orderItem) => {
        const product = menu.find(item => item.id === orderItem.productId)
        if (!product)
            invalidOrderItems.push(orderItem)

        return acc + orderItem.qty * (product?.price || 0)
    }, 0)

    return (<>
        <OrderDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} order={order} menu={menu} />
        <div className='card cursor-pointer' onClick={() => setIsOpen(true)}>

            <div className='card__body'>
                <h1>{order.id}</h1>
                <div className="card__footer">
                    <span>{order.status}</span>
                    <span>{total}€</span>
                    {!!invalidOrderItems.length && <span>{invalidOrderItems.length} errori nell'ordine</span>}
                </div>
            </div>
        </div>
    </>
    )
}