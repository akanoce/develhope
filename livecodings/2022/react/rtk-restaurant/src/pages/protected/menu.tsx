import { useEffect, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetMenuQuery, useLazyGetMenuQuery } from "../../redux/api/menuApiSlice"
import { setCredentials } from "../../redux/slice/authSlice"
import { addToCart, selectRestaurant } from "../../redux/slice/restaurantSlice"
import { useNavigate } from 'react-router-dom'
import { CategoryModel, MenuModel } from "../../types"
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon, PlusIcon, MinusIcon } from '@heroicons/react/solid'

export default function Menu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const restaurant = useSelector(selectRestaurant)

    const [selectedProduct, setSelectedProduct] = useState<MenuModel | undefined>(undefined)

    function handleAddToCart(productId: number, quantity: number) {
        dispatch(addToCart({ productId, qty: quantity }))
    }
    return (
        <>
            {selectedProduct && <AddToCart product={selectedProduct} closeModal={() => setSelectedProduct(undefined)} addToCart={handleAddToCart} />}
            <div className="flex flex-row flex-wrap justify-between items-stretch">
                {restaurant.menu.map((item, idx) => {
                    const category = restaurant.categories.find(category => category.id === item.category_id)
                    return <MenuItem item={item} key={idx} category={category} addToCart={setSelectedProduct} />
                })}
            </div>
        </>
    )
}

export function MenuItem({ item, category, addToCart }: { item: MenuModel, category: CategoryModel | undefined, addToCart: (product: MenuModel) => void }) {

    return (
        <div className="w-full md:w-1/3+ mt-8 border rounded border-black flex flex-col justify-between items-center">
            <img src={item.img} width='100%' />
            <div className="p-4 w-full flex flex-row justify-between items-center">
                <h3 className='font-bold' >{item.name}</h3>
                <h5 className='text-white bg-green-500 p-1 rounded' >{item.price}€</h5>
            </div>
            <div className="px-4 pb-4 w-full flex flex-row justify-between items-center">
                <h5 className='text-black bg-blue-200 p-1 rounded' >{category?.name || item.category_id}</h5>
                <button className='text-white bg-blue-500 p-1 rounded flex items-center' onClick={() => addToCart(item)} >
                    <ShoppingCartIcon className='h-5 w-5' />
                    <h5 className='ml-2'>Aggiungi</h5>
                </button>
            </div>
        </div>

    )
}

function AddToCart({ product, closeModal, addToCart }: { product: MenuModel, closeModal: () => void, addToCart: (productId: number, qty: number) => void }) {

    const [quantity, setQuantity] = useState<number>(1)

    function handleAddToCart() {
        if (quantity) {
            addToCart(product.id, quantity)
            closeModal()
        }
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                                >
                                    <span>Aggiungi {product.name}</span>
                                    <h5 className='text-white bg-green-500 p-1 rounded' >{product.price}€</h5>
                                </Dialog.Title>
                                <div className="my-4 flex flex-col justify-start">
                                    <label htmlFor="qty">Quantità</label>
                                    <div className="flex items-center justify-between ">
                                        <button className="btn" disabled={quantity <= 0} onClick={() => quantity > 0 && setQuantity(quantity - 1)}><MinusIcon className="w-5 h-5" /></button>
                                        <input className='w-1/2 text-center' type='number' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                        <button className="btn" onClick={() => setQuantity(quantity + 1)} ><PlusIcon className="w-5 h-5" /></button>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex"><h5 className="font-bold"> Totale: </h5> <h5 className="ml-2">{product.price * quantity}€</h5></div>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleAddToCart}
                                    >
                                        Aggiungi
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