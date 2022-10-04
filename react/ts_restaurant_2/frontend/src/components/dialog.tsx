import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Action, useCart } from '../context/cartContext'
import { MenuItemModel, menuItemSchema, OrderModel, orderSchema, ProductInOrderModel } from '../types'
import { FaCartPlus, FaClipboardCheck, FaTrashAlt } from 'react-icons/fa'
import useLazyFetch from '../hooks/useLazyFetch'

import { useData } from '../context/dataContext'

export function InsertProductDialog({ isOpen, closeModal, product }: { isOpen: boolean, closeModal: () => void, product: MenuItemModel }) {

    const [qty, setQty] = useState<number>(0)
    const { dispatch } = useCart()

    function insertProduct() {
        if (qty > 0) {
            dispatch({ type: 'insert', payload: { productId: product.id, qty } })
            closeModal()
        }
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Inserisci prodotto
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Digita qui la quantità che vuoi inserire di <span className='text-black font-bold' >{product.name}</span>
                                        </p>
                                    </div>
                                    <div className='flex flex-row items-center justify-between py-4 '>
                                        <button disabled={qty <= 0} onClick={() => setQty(qty - 1)} >-</button>
                                        <input disabled value={qty} type='number' className='w-2/3' />
                                        <button onClick={() => setQty(qty + 1)} >+</button>
                                    </div>


                                    <div className="mt-4 flex items-center justify-between">
                                        <span className='bg-slate-200 rounded px-2 py-1'>{qty * product.price}€</span>
                                        <button
                                            disabled={qty <= 0}
                                            type="button"
                                            className="inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-blue-100"
                                            onClick={insertProduct}
                                        >
                                            <FaCartPlus />
                                            {/* <p>Inserisci nel carrello</p> */}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export function CartDialog({ isOpen, closeModal, cart, menu, dispatch }: { isOpen: boolean, closeModal: () => void, cart: ProductInOrderModel[], menu: MenuItemModel[], dispatch: (value: Action<ProductInOrderModel>) => void }) {

    const { setOrders, orders } = useData()

    const { trigger: triggerNewOrder } = useLazyFetch<OrderModel>('/orders', orderSchema)
    const total = cart.reduce((acc, orderItem) => {
        const product = menu.find(item => item.id === orderItem.productId)
        return acc + orderItem.qty * (product?.price || 0)
    }, 0)

    async function handleResetCart() {
        dispatch({ type: 'reset' })
        closeModal()
    }

    async function sendOrder() {
        const newOrder = await triggerNewOrder({ method: 'POST', body: JSON.stringify({ products: cart, status: 'pending' }) })
        if (newOrder) {
            setOrders([...orders, newOrder])
            dispatch({ type: 'reset' })
        }
        closeModal()

    }


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Carrello
                                    </Dialog.Title>
                                    {cart.length <= 0 ? <h3 className='my-2 font-bold text-xl text-center'>Il Carrello è vuoto!</h3>
                                        : (
                                            <div className='flex flex-col justify-start my-2 gap-2 '>
                                                {cart.map((item, idx) => {
                                                    const product = menu.find(prod => prod.id === item.productId)

                                                    return (<div key={idx}>
                                                        <div className='flex items-center justify-between w-full'>
                                                            <div className=''>
                                                                <p>{product?.name || 'Prodotto non trovato'} x {item.qty}</p>
                                                            </div>
                                                            <p>{item.qty * (product?.price || 0)}€</p>
                                                        </div>
                                                        {idx < (cart.length - 1) && <span className='w-full bg-black h-[1px] block mt-[2px]' />}
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    {cart.length > 0 &&
                                        <div className='flex justify-between items-center pt-2'>
                                            <div className='flex gap-2'>
                                                <button className='flex items-center gap-2 bg-red-500 hover:bg-red-200 border-red-500' onClick={handleResetCart}>
                                                    <FaTrashAlt />
                                                    Svuota il carrello
                                                </button>
                                                <button className='flex items-center gap-2' onClick={sendOrder}>
                                                    <FaClipboardCheck />
                                                    Conferma ordine
                                                </button>
                                            </div>
                                            <span>{total}€</span>
                                        </div>
                                    }

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export function OrderDialog({ isOpen, closeModal, order, menu }: { isOpen: boolean, closeModal: () => void, order: OrderModel, menu: MenuItemModel[] }) {

    const { setOrders, orders } = useData()

    const { trigger: triggerNewOrder } = useLazyFetch<OrderModel>('/orders', orderSchema)
    const total = order.products.reduce((acc, orderItem) => {
        const product = menu.find(item => item.id === orderItem.productId)
        return acc + orderItem.qty * (product?.price || 0)
    }, 0)



    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Ordine #{order.id}
                                    </Dialog.Title>
                                    {order.products.length <= 0 ? <h3 className='my-2 font-bold text-xl text-center'>Il Carrello è vuoto!</h3>
                                        : (
                                            <div className='flex flex-col justify-start my-2 gap-2 '>
                                                {order.products.map((item, idx) => {
                                                    const product = menu.find(prod => prod.id === item.productId)

                                                    return (<div key={idx}>
                                                        <div className='flex items-center justify-between w-full'>
                                                            <div className=''>
                                                                <p>{product?.name || 'Prodotto non trovato'} x {item.qty}</p>
                                                            </div>
                                                            <p>{item.qty * (product?.price || 0)}€</p>
                                                        </div>
                                                        {idx < (order.products.length - 1) && <span className='w-full bg-black h-[1px] block mt-[2px]' />}
                                                    </div>
                                                    )
                                                })}
                                                <div className='flex justify-end items-center pt-2'>
                                                    <span>{total}€</span>
                                                </div>
                                            </div>

                                        )}

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
