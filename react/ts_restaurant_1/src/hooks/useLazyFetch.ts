import { useEffect, useReducer, useState } from "react"

type State<T> = {
    loading: boolean,
    error?: Error
    data?: T
}

type Action<T> =
    {
        type: 'loading'
    } |
    {
        type: 'error',
        payload: Error
    } |
    {
        type: 'fetched',
        payload: T
    }


const baseUrl = 'http://localhost:3010'
export function useLazyFetch<T = unknown>(url: string) {

    const initalState: State<T> = {
        loading: false,
        error: undefined,
        data: undefined
    }

    function reducer(state: State<T>, action: Action<T>) {
        switch (action.type) {
            case 'loading':
                return { ...state, loading: true }
            case 'error':
                return { ...state, loading: false, error: action.payload }
            case 'fetched':
                return { ...state, loading: false, error: undefined, data: action.payload }
        }
    }

    const [state, dispatch] = useReducer(reducer, initalState)

    async function initFetch(options?: RequestInit) {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(baseUrl + url, options)
            const json = await res.json()
            if (!res.ok)
                dispatch({ type: 'error', payload: json })
            else
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