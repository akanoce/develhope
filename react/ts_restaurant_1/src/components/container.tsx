import { useCart } from "context/cartContext";
import { useData } from "context/dataContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

export default function Container({ children }: { children: React.ReactNode }) {

    const data = useData()

    return (
        <>
            <NavBar />
            <div className='container'>
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

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    const cartTotal = cart.reduce((acc, product) => {
        const completeProduct = menu.find(prod => prod.id === product.productId)
        return acc + (product.qty * parseFloat(completeProduct?.price || "0"))
    }, 0)


    return (
        <nav className="navbar">
            <div className="left_nav">
                {NavItems.map(item => <span onClick={() => navigate(item.url)} className={`nav_item ${location.pathname.includes(item.url) && 'active'}`}>{item.name}</span>)}
            </div>
            <div className="right_nav">
                <span>Carrello ({cartTotal}€)</span>
            </div>
        </nav>
    )
}