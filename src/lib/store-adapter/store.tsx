'use client';

import { makeAutoObservable } from 'mobx';
import { createContext, FC, ReactNode, useContext, useRef } from 'react';

class TestStore {
  count = 1;
  requestId = Math.random().toString(36).slice(2);

  constructor() {
    makeAutoObservable(this);
  }

  increment = (): void => {
    this.count++;
  };
}

export function createMobxContext<StoreType>() {
  const Context = createContext<StoreType | null>(null);

  const useStore = (): StoreType => {
    const value = useContext(Context);

    if (!value) {
      throw new Error('useStore must be used within its Provider');
    }

    return value;
  };

  const useStoreHydration = (fn: () => void) => {
    const state = useStore();
    const ref = useRef(false);

    if (!ref.current) {
      fn();
      ref.current = true;
    }

    return state;
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

const { createProvider, useStore } = createMobxContext<TestStore>();

export const useRootStore = useStore;

export const RootStoreProvider = createProvider(() => new TestStore());
