import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export function Container({ children }: { children: React.ReactNode }) {


    return (
        <>
            <NavBar />
            <div className="container">
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

    console.log(location)

    return (
        <nav className="navbar">
            <div className="left">
                {Menu.map(item => {
                    const isActive = location.pathname.includes(item.url)
                    return <span onClick={() => navigate(item.url)} className={`navbar_item ${isActive && 'active'} `}>{item.name}</span>
                })}
            </div>
            <span className="cart">
                Carrello
            </span>
        </nav>
    )
}