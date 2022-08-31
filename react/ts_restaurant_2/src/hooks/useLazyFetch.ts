import { useEffect, useReducer } from "react"

type State<T> = {
    loading: boolean,
    error?: Error,
    data?: T
}

type Action<T> =
    { type: 'loading' } |
    { type: 'fetched', payload: T } |
    { type: 'error', payload: Error }


const baseUrl = 'http://localhost:3010'
export default function useLazyFetch<T = unknown>(url: string) {

    const initialState: State<T> = {
        loading: false,
        error: undefined,
        data: undefined
    }

    function fetchReducer(state: State<T>, action: Action<T>) {
        switch (action.type) {
            case 'loading':
                return { ...state, error: undefined, loading: true }
            case 'error':
                return { ...state, loading: false, error: action.payload }
            case 'fetched':
                return { ...state, loading: false, error: undefined, data: action.payload };
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    async function initFetch(options?: RequestInit) {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(baseUrl + url, options)
            const json = await res.json()
            dispatch({ type: 'fetched', payload: json })
        }
        catch (e: any) {
            console.error('useFetch', e)
            dispatch({ type: 'error', payload: e })
        }
    }


    return {
        ...state,
        trigger: initFetch
    }
}