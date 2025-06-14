'use client';

import { createContext, FC, ReactNode, useContext, useRef } from 'react';

export function createMobxContext<StoreType>() {
  const Context = createContext<StoreType | null>(null);

  const useStore = (): StoreType => {
    const value = useContext(Context);

    if (!value) {
      throw new Error('useStore must be used within its Provider');
    }

    return value;
  };

  const useStoreHydration = (fn: (store: StoreType) => void) => {
    const store = useStore();
    const initializationRef = useRef(false);

    if (!initializationRef.current) {
      fn(store);
      initializationRef.current = true;
    }

    return store;
  };

  const createProvider = (makeStore: () => StoreType) => {
    const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
      const storeRef = useRef<StoreType | null>(null);

      if (!storeRef.current) {
        storeRef.current = makeStore();
      }

      return (
        <Context.Provider value={storeRef.current}>{children}</Context.Provider>
      );
    };

    return StoreProvider;
  };

  return {
    createProvider,
    useStore,
    useStoreHydration,
  };
}
