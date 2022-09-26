import React, { createContext, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { MenuCategoryModel, menuCategorySchema, MenuItemModel, menuItemSchema, OrderModel, orderSchema } from "../types";



type DataContextProps = {
    orders: OrderModel[],
    setOrders: (orders: OrderModel[]) => void
    ordersLoading: boolean,
    ordersError: Error | undefined,
    menu: MenuItemModel[],
    menuLoading: boolean,
    menuError: Error | undefined,
    categories: MenuCategoryModel[],
    categoriesLoading: boolean,
    categoriesError: Error | undefined,
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export function DataContextProvider({ children }: { children: React.ReactNode }) {

    const { loading: menuLoading, error: menuError, data: menu } = useFetch<MenuItemModel[]>('/menu', menuItemSchema.array())
    const { loading: ordersLoading, error: ordersError, data: orders, dispatch: dispatchOrders } = useFetch<OrderModel[]>('/orders', orderSchema.array())
    const { loading: categoriesLoading, error: categoriesError, data: categories } = useFetch<MenuCategoryModel[]>('/categories', menuCategorySchema.array())

    return (
        <DataContext.Provider value={{
            orders: orders || [],
            setOrders: (newOrders: OrderModel[]) => dispatchOrders({ type: 'fetched', payload: newOrders }),
            ordersLoading,
            ordersError,
            menu: menu || [],
            menuLoading,
            menuError,
            categories: categories || [],
            categoriesLoading,
            categoriesError
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const value = useContext(DataContext);
    if (!value)
        throw ('Context must be used within a provider')
    return value
}