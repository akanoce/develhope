import { Dialog, Transition } from '@headlessui/react'
import { useCart } from 'context/cartContext'
import { Fragment, useState } from 'react'
import { MenuItemModel } from 'types'



export default function InsertProductInCart({ isOpen, closeModal, product }: { isOpen: boolean, closeModal: () => void, product: MenuItemModel }) {

    const { cart, dispatchCart } = useCart()
    const [quantity, setQuantity] = useState<number>(1)

    function insertInCart() {
        dispatchCart({ type: 'insert', payload: { productId: product.id, qty: quantity } });
        closeModal();



    }
    return (
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
                                        Inserisci la quantità che vuoi acquistare di <span className='text-black font-medium' >{product.name}</span>
                                    </p>
                                </div>
                                <div className='my-4 flex justify-between items-center'>
                                    <button disabled={quantity <= 1} className='w-1/6' onClick={() => setQuantity(quantity - 1)} >-</button>
                                    <input className='w-1/2' type='number' value={quantity} disabled />
                                    <button className='w-1/6' onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className='py-1 px-2 bg-blue-200 rounded text-black' >{quantity * parseFloat(product.price)}€</span>
                                    <button onClick={insertInCart}>Inserisci nel carrello</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}