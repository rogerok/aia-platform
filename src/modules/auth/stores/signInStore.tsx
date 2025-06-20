'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { authClient } from '@/lib/auth';
import { MobxForm } from '@/lib/form/mobxForm';
import { createMobxContext } from '@/lib/store-adapter/storeAdapter';
import { RouterStore, useRouterStore } from '@/lib/stores/routerStore';
import { AuthByEmailModel } from '@/modules/auth/models/auth';
import { AuthService } from '@/modules/auth/services/authService';

class SignInStore {
  authService: AuthService;
  routerStore: RouterStore;

  form = new MobxForm<AuthByEmailModel>({
    abortController: new AbortController(),
    defaultValues: {
      email: '',
      password: '',
    },
    lazyUpdates: false,
    onSubmit: this.submitForm.bind(this),
    resolver: classValidatorResolver(AuthByEmailModel),
  });
  loading: boolean = false;
  error: string | undefined;

  constructor(authService: AuthService, routerStore: RouterStore) {
    this.authService = authService;
    this.routerStore = routerStore;

    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async submitForm(data: AuthByEmailModel): Promise<void> {
    this.loading = true;
    const resp = await this.authService.signInWithEmailAndPassword(data);

    if (resp.data) {
      this.routerStore.navigate('/sign-up');
    } else {
      runInAction(() => {
        this.error = resp.error.message;
      });
    }

    this.loading = false;
  }
}

const { createProvider, useStore } = createMobxContext<SignInStore>();

export const useSignInStore = useStore;

export const SignInStoreProvider = createProvider(() => {
  const routerStore = useRouterStore();
  return new SignInStore(new AuthService(authClient), routerStore);
});
