'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export class RouterStore {
  router: AppRouterInstance | null = null;

  constructor() {}

  init(router: AppRouterInstance) {
    this.router = router;
  }

  navigate(route: string) {
    this.router?.push(route);
  }
}
