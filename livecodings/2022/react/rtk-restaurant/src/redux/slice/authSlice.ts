import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthSliceState = { user: {} | null, token: string | null }

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthSliceState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: {}, accessToken: string }>) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
            localStorage.setItem('accessToken', accessToken)
        },
        logOut: (state) => {
            console.log('logout')
            localStorage.removeItem('accessToken')
            state.user = null
            state.token = null

        },
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token 