'use client';

import { AuthClient, authClient as authenticationClient } from '@/lib/auth';
import { AuthService } from '@/lib/services/authService';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { AuthStore } from '@/lib/stores/authStore';
import { RouterStore } from '@/lib/stores/routerStore';

interface RootStoreArgs {
  authClient: AuthClient;
  authStore: AuthStore;
  router: RouterStore;
}

export class RootStore {
  router: RouterStore;
  authStore: AuthStore;
  authClient: AuthClient;

  constructor(args: RootStoreArgs) {
    this.router = args.router;
    this.authStore = args.authStore;
    this.authClient = args.authClient;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<RootStore>();

export const useRootStore = useStore;
export const useRootStoreHydration = useStoreHydration;

export const RootStoreProvider = createProvider(() => {
  const router = new RouterStore();
  const authClient = new AuthClient(authenticationClient);
  const authStore = new AuthStore(new AuthService(authClient), router);

  return new RootStore({
    authClient,
    authStore,
    router,
  });
});
