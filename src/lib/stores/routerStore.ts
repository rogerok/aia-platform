'use client';

import { makeAutoObservable } from 'mobx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { createMobxContext } from '@/lib/store-adapter/storeAdapter';

export class RouterStore {
  router: AppRouterInstance | null = null;

  constructor() {
    // TODO: do i need it?
    makeAutoObservable(this);
  }

  init(router: AppRouterInstance) {
    this.router = router;
  }

  navigate(route: string) {
    this.router?.push(route);
  }
}

const { createProvider, useStore, useStoreHydration } =
  createMobxContext<RouterStore>();
export const RouterProvider = createProvider(() => new RouterStore());
export const useRouterStoreHydration = useStoreHydration;
export const useRouterStore = useStore;
