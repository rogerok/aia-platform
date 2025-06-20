// 'use client';
//
// import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
//
// import { makeAutoObservable } from 'mobx';
//
// import { createMobxContext } from '@/lib/store-adapter/storeAdapter';
//
// export class RouterStore {
//   router: AppRouterInstance = null;
//
//   constructor() {
//     makeAutoObservable(this);
//   }
//
//   init(router: AppRouterInstance) {
//     this.router = router;
//   }
//
//   navigate(route: string) {
//     this.router.push(route);
//   }
// }
//
// const { createProvider, useStoreHydration } = createMobxContext<RouterStore>();
// export const RouterProvider = createProvider(() => new RouterStore());
// export const useRouterStoreHydration = useStoreHydration;
