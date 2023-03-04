import { useCart } from "context/cartContext";
import { useData } from "context/dataContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { CartDialog } from "./dialog";
import { HiShoppingCart } from 'react-icons/hi'

export default function Container({ children }: { children: React.ReactNode }) {

    const data = useData()

    return (
        <>
            <NavBar />
            <div className='page-container'>
                {children}
            </div>
        </>
    )
}

export type NavItemType = { name: string, icon?: any, url: string }
export const NavItems: NavItemType[] = [
    {
        name: 'Menu',
        url: '/menu',
    },
    {
        name: 'Orders',
        url: '/orders',
    }
]

export function NavBar() {

    const navigate = useNavigate()
    const location = useLocation()
    const { cart } = useCart()
    const { menu } = useData()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    const cartTotal = cart.reduce((acc, product) => {
        const completeProduct = menu.find(prod => prod.id === product.productId)
        return acc + (product.qty * parseFloat(completeProduct?.price || "0"))
    }, 0)


    return (
        <nav className="navbar">
            <CartDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} menu={menu} />
            <div className="flex items-center gap-2">
                {NavItems.map(item => <span onClick={() => navigate(item.url)} className={`nav_item ${location.pathname.includes(item.url) && 'active'}`}>{item.name}</span>)}
            </div>
            <button className="flex flex-row items-center gap-2" onClick={() => setIsOpen(true)}>
                <HiShoppingCart />
                <p>{cartTotal}€</p>
            </button>

        </nav>
    )
}