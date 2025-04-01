import { useSyncExternalStore, useMemo, useCallback } from 'react';

type Listener = () => void;

interface Store<T> {
  getSnapshot: () => T;
  subscribe: (listener: Listener) => () => void;
  setState: (newState: T | ((prev: T) => T)) => void;
}

const storeCache = new Map<string, Store<any>>();

function createPersistentStore<T>(key: string, initialState: T): Store<T> {
  let storedValue: T;
  try {
    const item = localStorage.getItem(key);
    storedValue = item ? JSON.parse(item) : initialState;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    storedValue = initialState;
  }

  let state = storedValue;
  const listeners = new Set<Listener>();

  return {
    getSnapshot() {
      return state;
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setState(newState: T | ((prev: T) => T)) {
      // Handle updater function or direct value
      state = typeof newState === 'function' ?
        (newState as (prev: T) => T)(state) :
        newState;
      // Persist to localStorage
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
      // Notify all listeners
      listeners.forEach((listener) => listener());
    },
  };
}

export function usePersistentState<T>(
  key: string, initialState: T): [T, (newState: T | ((prev: T) => T)
  ) => void] {
  const store = useMemo(() => {
    const existingStore = storeCache.get(key);
    if (existingStore) return existingStore as Store<T>;

    const newStore = createPersistentStore<T>(key, initialState);
    storeCache.set(key, newStore);
    return newStore;
  }, [key, initialState]);

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    const actualState = typeof newState === 'function' ?
      (newState as (prev: T) => T)(store.getSnapshot()) :
      newState;
    store.setState(actualState);
  }, [store]);

  return [state, setState];
}
