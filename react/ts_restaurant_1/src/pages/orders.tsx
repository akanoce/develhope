import { useFetch } from "hooks/useFetch"
import { OrderModel } from "types"

export default function Orders() {
    const { loading, error, data: orders } = useFetch<OrderModel[]>('/orders')

    return <>
        <h1>Orders</h1>
    </>
} 