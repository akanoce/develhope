import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/baseApiSlice";
import authReducer from "./slice/authSlice";
import restaurantReducer from "./slice/restaurantSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        restaurant: restaurantReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {api: CombinedState, auth: AuthSliceState}
export type AppDispatch = typeof store.dispatch