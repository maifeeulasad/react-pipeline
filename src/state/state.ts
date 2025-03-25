import { useState, useEffect, useCallback } from 'react';

type CacheItem<T> = {
    value: T;
    listeners: Set<(newValue: T) => void>;
};

const cache = new Map<string, CacheItem<any>>();

const usePersistentState = <T>(
    key: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setInternalState] = useState<T>(() => {
        // Check cache first
        if (cache.has(key)) {
            return cache.get(key)!.value;
        }

        // Initialize from localStorage
        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) {
                const value = JSON.parse(stored) as T;
                cache.set(key, { value, listeners: new Set() });
                return value;
            }
        } catch (error) {
            console.error(`Error parsing stored data for key "${key}":`, error);
        }

        // Use initial value
        const value = typeof initialValue === 'function'
            ? (initialValue as () => T)()
            : initialValue;
        cache.set(key, { value, listeners: new Set() });
        return value;
    });

    useEffect(() => {
        const cachedItem = cache.get(key);
        if (!cachedItem) return;

        const listener = (newValue: T) => {
            setInternalState(newValue);
        };
        cachedItem.listeners.add(listener);

        return () => {
            cachedItem.listeners.delete(listener);
            // Cleanup cache if no listeners left
            if (cachedItem.listeners.size === 0) {
                cache.delete(key);
            }
        };
    }, [key]);

    const setState = useCallback<React.Dispatch<React.SetStateAction<T>>>((action) => {
        const cachedItem = cache.get(key);
        if (!cachedItem) return;

        const prevValue = cachedItem.value;
        const newValue = typeof action === 'function'
            ? (action as (prevState: T) => T)(prevValue)
            : action;

        if (newValue !== prevValue) {
            cachedItem.value = newValue;
            cachedItem.listeners.forEach(listener => listener(newValue));

            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.error(`Error saving data for key "${key}":`, error);
            }
        }
    }, [key]);

    return [state, setState];
};

export { usePersistentState };