import { FullscreenLoader } from "components/spinners"
import { useData } from "context/dataContext"
import { useFetch } from "hooks/useFetch"
import { MenuItemModel, OrderModel } from "types"



export default function Orders() {

    const { menuLoading, menuError, menu, ordersLoading, ordersError, orders } = useData()

    return (
        <>
            <h1>Orders</h1>
            {(ordersLoading || menuLoading) && <FullscreenLoader />}
            {(ordersError || menuError) && <h3>Error while fetching orders</h3>}
            <div className="orders_container">
                {orders.map(order => <OrderItem order={order} menu={menu} />)}
            </div>
        </>
    )
}

function OrderItem({ order, menu }: { order: OrderModel, menu: MenuItemModel[] }) {

    const total = order.products.reduce((acc, product) => {
        const completeProduct = menu.find(prod => prod.id === product.productId)
        return acc + (product.qty * parseFloat(completeProduct?.price || "0"))
    }, 0)

    return (
        <div className="order_card">
            <span>{order.id}</span>

            <span>{total}€</span>

        </div>
    )
}