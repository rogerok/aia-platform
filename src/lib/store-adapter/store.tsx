'use client';

// import { makeAutoObservable } from 'mobx';
// import React, { createContext, ReactNode, useContext, useRef } from 'react';

// class TestStore {
//   count = 1;
//
//   constructor() {
//     makeAutoObservable(this);
//   }
// }

// function createStoreContext<Store>(makeStore: () => Store) {
//   const StoreContext = createContext<null | Store>(null);
//
//   const useStore = (): Store => {
//     const contextVal = useContext(StoreContext);
//
//     if (!contextVal) {
//       throw new Error('useStore must be used within a Provider');
//     }
//
//     return contextVal;
//   };
//
//   const Provider = ({ children }: { children: ReactNode }) => {
//     const ref = useRef<null | Store>(null);
//
//     if (!ref.current) {
//       ref.current = makeStore();
//     }
//
//     return <StoreContext value={ref.current}>{children}</StoreContext>;
//   };
//
//   return { Provider, useStore };
// }
