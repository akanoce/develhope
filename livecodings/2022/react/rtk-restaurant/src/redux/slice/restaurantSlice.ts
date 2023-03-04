import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryModel, MenuModel, OrderItemModel, OrderModel } from '../../types'
import { RootState } from '../store'

export type RestaurantSliceModel = {
    menu: MenuModel[],
    categories: CategoryModel[],
    orders: OrderModel[],
    cart: OrderItemModel[]

}
const restaurantSlice = createSlice({
    name: 'restaurantSlice',
    initialState: { menu: [], categories: [], orders: [], cart: [] } as RestaurantSliceModel,
    reducers: {
        setRestaurant: (state, action: PayloadAction<Partial<RestaurantSliceModel>>) => {
            return {
                ...state, ...action.payload
            }
        },
        addToCart: (state, action: PayloadAction<OrderItemModel>) => {
            return { ...state, cart: [...state.cart, action.payload] }
        }
    }
})

export const { setRestaurant, addToCart } = restaurantSlice.actions
export default restaurantSlice.reducer

export const selectRestaurant = (state: RootState) => state.restaurant