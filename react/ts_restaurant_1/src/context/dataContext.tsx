import { useFetch } from "hooks/useFetch";
import React, { createContext, useCallback, useContext } from "react";
import { MenuCategoryModel, MenuItemModel, OrderModel } from "types";

//in questo context, devo gestire errrore, caricametno e dati di menu + ordini 


export type DataContextProps = {
    categoriesLoading: boolean,
    categoriesError: Error | undefined
    categories: MenuCategoryModel[],
    menuLoading: boolean,
    menuError: Error | undefined
    menu: MenuItemModel[],
    ordersLoading: boolean,
    ordersError: Error | undefined
    orders: OrderModel[],
}


export const DataContext = createContext<DataContextProps | undefined>(undefined)

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const { loading: categoriesLoading, error: categoriesError, data: categories } = useFetch<MenuCategoryModel[]>('/categories')
    const { loading: ordersLoading, error: ordersError, data: orders } = useFetch<OrderModel[]>('/orders')
    const { loading: menuLoading, error: menuError, data: menu } = useFetch<MenuItemModel[]>('/menu')

    return (
        <DataContext.Provider
            value={{
                categoriesLoading,
                categoriesError,
                categories: categories || [],
                menuLoading,
                menuError,
                menu: menu || [],
                ordersLoading,
                ordersError,
                orders: orders || []
            }}>
            {children}

        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined)
        throw new Error('Context must be used with a provider')
    return context
}



