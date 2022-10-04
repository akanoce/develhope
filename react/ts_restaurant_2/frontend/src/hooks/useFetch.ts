import { useEffect, useReducer } from "react"
import { z } from 'zod'

type State<T> = {
    loading: boolean,
    error?: Error,
    data?: T
}

type Action<T> =
    { type: 'loading' } |
    { type: 'fetched', payload: T } |
    { type: 'error', payload: Error } |
    { type: 'update', payload: T }


const baseUrl = 'http://localhost:3010'
export default function useFetch<T = unknown>(url: string, validationSchema?: z.ZodTypeAny, options?: RequestInit) {

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
            case 'update':
                return { ...state, data: action.payload };
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    async function initFetch() {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(baseUrl + url, options)
            const json = await res.json()
            if (validationSchema) {
                const parsed = validationSchema.parse(json)
                dispatch({ type: 'fetched', payload: parsed })

            }
            else
                dispatch({ type: 'fetched', payload: json })
        }
        catch (e: any) {
            console.error('useFetch', e)
            dispatch({ type: 'error', payload: e })
        }
    }

    useEffect(() => {

        initFetch()
    }, [])

    return {
        ...state,
        trigger: initFetch,
        dispatch
    }
}