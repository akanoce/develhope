import { LoginResponse } from "../../types"
import { apiSlice } from "./baseApiSlice"



// Define a service using a base URL and expected endpoints
export const authApi = apiSlice.injectEndpoints({
    //   reducerPath: 'auth',
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (data) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data
                }
            },
        }),
        register: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (data) => {
                return {
                    url: 'register',
                    method: 'POST',
                    body: data
                }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi