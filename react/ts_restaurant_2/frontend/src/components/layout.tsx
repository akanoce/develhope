import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useData } from "../context/dataContext";
import { FaShoppingCart } from 'react-icons/fa'
import { CartDialog } from "./dialog";


export function Container({ children }: { children: React.ReactNode }) {


    return (
        <>
            <NavBar />
            <div className="page-container">
                {children}
            </div>
        </>
    )
}


export type MenuItem = {
    name: string,
    icon?: React.ReactNode,
    url: string,
}

export const Menu: MenuItem[] = [
    {
        name: 'Menu',
        url: 'menu'
    },
    {
        name: 'Ordini',
        url: 'orders'
    }
]



export function NavBar() {

    const location = useLocation()
    const navigate = useNavigate()

    const { cart, dispatch } = useCart()
    const { menu, orders } = useData()

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const total = cart.reduce((acc, orderItem) => {
        const product = menu.find(item => item.id === orderItem.productId)
        return acc + orderItem.qty * (product?.price || 0)
    }, 0)

    return (
        <nav className="navbar">
            <CartDialog isOpen={isCartOpen} closeModal={() => setIsCartOpen(false)} cart={cart} menu={menu} dispatch={dispatch} />
            <div className="left">
                {Menu.map(item => {
                    const isActive = location.pathname.includes(item.url)

                    return <span onClick={() => navigate(item.url)} className={`navbar_item relative ${isActive && 'active'} `}>
                        {item.name}
                        {item.url === 'orders' && <span className="block absolute -top-3 px-1 py-0.5 -right-3 rounded-full bg-red-500 text-white text-sm">{orders.length}</span>}
                    </span>
                })}
            </div>
            <button className='cart-badge' onClick={() => setIsCartOpen(true)}>
                <FaShoppingCart />
                <p>{total} €</p>
            </button>
        </nav>
    )
}