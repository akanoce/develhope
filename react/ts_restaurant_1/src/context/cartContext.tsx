import { useFetch } from "hooks/useFetch";
import React, { createContext, useCallback, useContext, useState } from "react";
import { MenuCategoryModel, MenuItemModel, OrderModel } from "types";
import { useData } from "./dataContext";

//in questo context, devo gestire errrore, caricametno e dati di menu + ordini 

export type CartItem = { productId: number, qty: number }

export type CartContextProps = {
    cart: CartItem[],
    setCart: (cart: CartItem[]) => void
}


export const CartContext = createContext<CartContextProps | undefined>(undefined)

export function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [cart, setCart] = useState<CartItem[]>([])

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart
            }}>
            {children}

        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined)
        throw new Error('Context must be used with a provider')
    return context
}



