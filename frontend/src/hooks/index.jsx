import React, { useState, useRef, useEffect } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}

export const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false)
    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}
