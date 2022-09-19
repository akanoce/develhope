import React, { createContext, useContext, useReducer, useState } from "react";
import useFetch from "../hooks/useFetch";
import { MenuCategoryModel, MenuItemModel, OrderModel, ProductInOrderModel } from "../types";



type CartContextProps = {
    cart: ProductInOrderModel[],
    dispatch: (value: Action<ProductInOrderModel>) => void
}

export type Action<T> = {
    type: 'reset'
} |
{
    type: 'insert',
    payload: T
} |
{
    type: 'remove',
    payload: T
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export function CartContextProvider({ children }: { children: React.ReactNode }) {

    function cartReducer(state: ProductInOrderModel[], action: Action<ProductInOrderModel>) {
        console.log(state, action)
        switch (action.type) {
            case 'reset':
                return []
            case 'insert': {
                const productExist = state.findIndex(el => el.productId === action.payload.productId)
                if (productExist !== -1) { // aggiorno la quantità del prodotto che trovo
                    const stateCopy = [...state]
                    console.log(stateCopy[productExist].qty)
                    stateCopy[productExist].qty += action.payload.qty
                    console.log(stateCopy[productExist].qty)
                    return stateCopy
                }
                else // inserisco il nuovo prodotto
                    return [...state, action.payload]
            }
            case 'remove': {
                const productExist = state.findIndex(el => el.productId === action.payload.productId)
                if (productExist !== -1) { // aggiorno la quantità del prodotto che trovo
                    // quantità residua > 0
                    const stateCopy = [...state]
                    stateCopy[productExist].qty -= action.payload.qty
                    if (stateCopy[productExist].qty > 0)
                        return stateCopy
                    else {
                        stateCopy.splice(productExist, 1)
                        return stateCopy
                    }
                }
                else
                    return state
            }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(cartReducer, [])


    return (
        <CartContext.Provider value={{
            cart: state,
            dispatch
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const value = useContext(CartContext);
    if (!value)
        throw ('Context must be used within a provider')
    return value
}