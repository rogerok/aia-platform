'use client';

import { authClient } from '@/lib/auth';
import { AuthService } from '@/lib/services/authService';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { AuthStore } from '@/lib/stores/authStore';
import { RouterStore } from '@/lib/stores/routerStore';

interface RootStoreArgs {
  authStore: AuthStore;
  router: RouterStore;
}

export class RootStore {
  router: RouterStore;
  authStore: AuthStore;

  constructor(args: RootStoreArgs) {
    this.router = args.router;
    this.authStore = args.authStore;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<RootStore>();

export const useRootStore = useStore;
export const useRootStoreHydration = useStoreHydration;

export const RootStoreProvider = createProvider(() => {
  const router = new RouterStore();
  const authStore = new AuthStore(new AuthService(authClient), router);

  return new RootStore({
    authStore: authStore,
    router: router,
  });
});
