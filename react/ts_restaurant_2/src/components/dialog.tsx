import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useCart } from '../context/cartContext'
import { MenuItemModel } from '../types'

export default function InsertProductDialog({ isOpen, closeModal, product }: { isOpen: boolean, closeModal: () => void, product: MenuItemModel }) {

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
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={insertProduct}
                                        >
                                            Inserisci nel carrello
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