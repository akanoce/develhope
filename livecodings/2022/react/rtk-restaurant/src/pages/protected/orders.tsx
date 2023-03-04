import { useSelector, useDispatch } from "react-redux"
import { RestaurantSliceModel, selectRestaurant, setRestaurant } from "../../redux/slice/restaurantSlice"
import { useNavigate } from 'react-router-dom'
import { MenuModel, OrderItemModel, OrderModel } from "../../types"
import { useState, Fragment } from "react"

import { Transition, Dialog } from '@headlessui/react'

import { ClipboardIcon } from '@heroicons/react/solid'
import { useDeleteOrderMutation } from "../../redux/api/menuApiSlice"

export default function Orders() {
    const navigate = useNavigate()
    const restaurant = useSelector(selectRestaurant)

    const [selectedOrder, setSelectedOrder] = useState<undefined | OrderModel>(undefined)

    return (
        <>
            {selectedOrder && <OrderModal order={selectedOrder} restaurant={restaurant} isOpen={true} closeModal={() => setSelectedOrder(undefined)} />}
            <div className="flex flex-row flex-wrap justify-between items-stretch">
                {restaurant.orders.map((order, idx) => <Order key={idx} order={order} openOrder={() => setSelectedOrder(order)} menu={restaurant.menu} />)}
            </div>
        </>
    )
}

export function Order({ order, menu, openOrder }: { order: OrderModel, menu: MenuModel[], openOrder: () => void }) {


    const orderTotal = order.products.reduce((acc, curr) => {
        const product = menu.find(prod => prod.id === curr.productId)
        return acc + curr.qty * (product?.price || 0)
    }, 0)
    return (
        <div onClick={openOrder} className="cursor-pointer hover:shadow-lg w-full md:w-1/3+ mt-8 p-4 border rounded border-black flex flex-col justify-between items-center">
            <div className="flex items-center justify-between w-full">
                <h5>#{order.id}</h5>
                <h5>{order.products.length} elementi</h5>
            </div>
            <div className='flex items-center justify-between w-full mt-4'>
                <span className="p-2 bg-green-500 rounded-xl text-white">{orderTotal}€</span>
                <span className="p-2 bg-blue-500 rounded-xl text-white">{'pending'}</span>
            </div>
        </div>


    )


}


export function OrderModal({ order, restaurant, isOpen, closeModal }: { order: OrderModel, restaurant: RestaurantSliceModel, isOpen: boolean, closeModal: () => void }) {

    const dispatch = useDispatch()
    const [deleteOrder, { isLoading: IsdeleteOrderLoading }] = useDeleteOrderMutation()

    async function handleDeleteOrder() {
        try {
            await deleteOrder({ id: order.id }).unwrap()
            dispatch(setRestaurant({ orders: restaurant.orders.filter(ord => ord.id !== order.id) }))
            closeModal()
        }
        catch (e: any) {
            console.error(e)
        }

    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}  >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                                >
                                    <div className='flex items-center'>
                                        <ClipboardIcon className='w-5 h-5' />
                                        <h5 className='ml-2' >Ordine #{order.id}</h5>
                                    </div>
                                    {/* <div className="flex"><h5 className="font-bold"> Totale: </h5> <h5 className="ml-2">{cartTotal}€</h5></div> */}
                                </Dialog.Title>
                                <div className="my-4 w-full h-px bg-slate-300"></div>
                                <ul className="list-disc">
                                    {order.products.map((item, idx) => {
                                        const product = restaurant.menu.find(prod => prod.id === item.productId)

                                        return <OrderItem qty={item.qty} name={product?.name || 'Non trovato'} price={product?.price || 0} />
                                    })}
                                </ul>
                                <div className="my-4 w-full h-px bg-slate-300"></div>

                                <div className="flex justify-between items-center">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md  border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:text-red-900 border-0 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={handleDeleteOrder}
                                    >
                                        Elimina Ordine
                                    </button>

                                    {/* <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border-0 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    // onClick={handleConfirmOrder}
                                    >
                                        Conferma ordine
                                    </button> */}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}

function OrderItem({ name, price, qty }: { name: string, price: number, qty: number }) {

    return (
        <li className='mt-2 flex items-center justify-between'>
            <h5>{qty}x {name}</h5>
            <h5>{qty * price}€</h5>
        </li>

    )
}
