import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

export default function Container({ children }: { children: React.ReactNode }) {

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

    useEffect(() => {
        console.log(location.pathname)
    }, [location])


    return (
        <nav className="navbar">
            <div className="left_nav">
                {NavItems.map(item => <span onClick={() => navigate(item.url)} className={`nav_item ${location.pathname.includes(item.url) && 'active'}`}>{item.name}</span>)}
            </div>
            <div className="right_nav">
                <span>Carrello</span>
            </div>
        </nav>
    )
}