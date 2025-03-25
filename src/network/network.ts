import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
    data?: T;
    loading: boolean;
    error?: string;
}

const useFetch = <T,>(url: string, options?: RequestInit): FetchState<T> => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result: T = await response.json();
            setData(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
};

export { useFetch };