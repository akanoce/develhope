import { CategoryModel, LoginResponse, MenuModel, OrderItemModel, OrderModel } from "../../types"
import { apiSlice } from "./baseApiSlice"



// Define a service using a base URL and expected endpoints
export const menuApi = apiSlice.injectEndpoints({
    //   reducerPath: 'auth',
    endpoints: (builder) => ({
        getMenuCategories: builder.query<CategoryModel[], {}>({
            query: () => {
                return {
                    url: 'categories',
                    method: 'GET',
                    // body: data
                }
            },
        }),
        getMenu: builder.query<MenuModel[], {}>({
            query: () => {
                return {
                    url: 'menu',
                    method: 'GET',
                    // body: data
                }
            },
        }),
        getOrders: builder.query<OrderModel[], {}>({
            query: () => {
                return {
                    url: 'orders',
                    method: 'GET',
                    // body: data
                }
            },
        }),
        createOrder: builder.mutation<OrderModel, { products: OrderItemModel[] }>({
            query: (data) => {
                return {
                    url: 'orders',
                    method: 'POST',
                    body: { ...data, status: 'pending' }
                }
            },
        }),
        deleteOrder: builder.mutation<{}, { id: number }>({
            query: ({ id }) => {
                return {
                    url: `orders/${id}`,
                    method: 'DELETE',
                }
            },
        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMenuQuery, useLazyGetMenuQuery, useLazyGetMenuCategoriesQuery, useLazyGetOrdersQuery, useCreateOrderMutation, useDeleteOrderMutation } = menuApi