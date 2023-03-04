import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3010',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})


export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
    // endpoints: 
})