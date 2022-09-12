import { useFetch } from "hooks/useFetch";
import React, { createContext, useCallback, useContext, useReducer, useState } from "react";
import { MenuCategoryModel, MenuItemModel, OrderModel } from "types";
import { useData } from "./dataContext";

//in questo context, devo gestire errrore, caricametno e dati di menu + ordini 

export type CartItem = { productId: number, qty: number }

export type CartContextProps = {
    cart: CartItem[],
    dispatchCart: (action: Action<CartItem>) => void
}

type Action<T> = {
    type: 'insert',
    payload: T
} |
{
    type: 'remove',
    payload: T
} |
{
    type: 'reset',
}


export const CartContext = createContext<CartContextProps | undefined>(undefined)

export function CartContextProvider({ children }: { children: React.ReactNode }) {

    function reducer(state: CartItem[], action: Action<CartItem>) {
        switch (action.type) {
            case 'insert':
                return [...state, action.payload]
            case 'remove':
                const productInCart = state.find(entry => entry.productId === action.payload.productId)
                if (!productInCart)
                    return state
                if (action.payload.qty - productInCart.qty >= 0)
                    return state.filter(prod => prod.productId === action.payload.productId)
                else {
                    productInCart.qty -= action.payload.qty
                    return state
                }
            case 'reset':
                return []
        }
    }

    const [state, dispatch] = useReducer(reducer, [])

    return (
        <CartContext.Provider
            value={{
                cart: state,
                dispatchCart: dispatch
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



