import useFetch from "../hooks/useFetch"
import { Order } from "../types"

export default function Orders() {
    const { loading, error, data } = useFetch<Order[]>('/orders')

    return (
        <>
        </>
    )
}