import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RestaurantSliceModel, selectRestaurant, setRestaurant } from '../redux/slice/restaurantSlice'
import { ShoppingCartIcon } from '@heroicons/react/solid'
import { Transition, Dialog } from '@headlessui/react'
import { useCreateOrderMutation } from '../redux/api/menuApiSlice'
const entries: {
    label: React.ReactNode,
    url: string
}[] = [
        {
            label: 'Menu',
            url: '/menu'
        },
        {
            label: 'Ordini',
            url: '/orders'
        },
    ]


export function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const restaurant = useSelector(selectRestaurant)

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const cartTotal = !restaurant.cart ? 0 : restaurant.cart.reduce((acc, curr) => {
        const product = restaurant.menu.find(prod => prod.id === curr.productId)
        return acc + curr.qty * (product?.price || 0)
    }, 0)

    return (
        <div className='w-full bg-gray-800 text-white sticky top-0 flex items-center justify-between shadow-md p-4 rounded-b-xl'>
            <CartModal restaurant={restaurant} cartTotal={cartTotal} isOpen={isCartOpen} closeModal={() => setIsCartOpen(false)} />
            <div className="flex items-center">
                {entries.map((entry, idx) => {
                    const isActive = location.pathname.includes(entry.url)
                    const ordersNumber = restaurant.orders.length
                    return (
                        <button key={idx} onClick={() => navigate(entry.url)} className={`relative p-2 ml-4 border-0  ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'} shadow-xl rounded-xl`}>
                            <span>{entry.label}</span>
                            {entry.url === '/orders' && <div style={{ top: '-15px', right: '-15px' }} className={`absolute py-1 px-2 ${ordersNumber > 0 ? 'bg-red-500' : 'bg-gray-500'} rounded-full text-white font-bold`}>
                                {ordersNumber}
                            </div>}
                        </button>
                    )


                })}
            </div>
            <button className='p-2 rounded-xl border-0 flex items-center' onClick={() => setIsCartOpen(true)}>
                <ShoppingCartIcon className='h-5 w-5' />
                <h5 className='ml-2'>
                    {cartTotal}€
                </h5>
            </button>
        </div>
    )
}

export function CartModal({ restaurant, cartTotal, isOpen, closeModal }: { restaurant: RestaurantSliceModel, cartTotal: number, isOpen: boolean, closeModal: () => void }) {

    const dispatch = useDispatch()
    const [createOrder, { isLoading: isCreateOrderLoading }] = useCreateOrderMutation()

    async function handleConfirmOrder() {

        try {
            const newOrder = await createOrder({ products: restaurant.cart }).unwrap()
            dispatch(setRestaurant({ cart: [], orders: [...restaurant.orders, newOrder] }))
            closeModal()
        }
        catch (e: any) {
            console.error(e)
        }

    }
    async function handleEmptyCart() {
        dispatch(setRestaurant({ cart: [] }))
        closeModal()

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
                                        <ShoppingCartIcon className='w-5 h-5' />
                                        <h5 className='ml-2' >Carrello</h5>
                                    </div>
                                    <div className="flex"><h5 className="font-bold"> Totale: </h5> <h5 className="ml-2">{cartTotal}€</h5></div>
                                </Dialog.Title>
                                <div className="my-4 w-full h-px bg-slate-300"></div>
                                <ul className="list-disc">
                                    {restaurant.cart.map(item => {
                                        const product = restaurant.menu.find(prod => prod.id === item.productId)

                                        return <CartItem qty={item.qty} name={product?.name || 'Non trovato'} price={product?.price || 0} />
                                    })}
                                </ul>
                                <div className="my-4 w-full h-px bg-slate-300"></div>

                                <div className="flex justify-between items-center">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md  border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:text-red-900 border-0 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={handleEmptyCart}
                                    >
                                        Svuota il carrello
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border-0 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleConfirmOrder}
                                    >
                                        Conferma ordine
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}

function CartItem({ name, price, qty }: { name: string, price: number, qty: number }) {

    return (
        <li className='mt-2 flex items-center justify-between'>
            <h5>{qty}x {name}</h5>
            <h5>{qty * price}€</h5>
        </li>

    )
}