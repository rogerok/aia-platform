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
  authService: AuthService;
  isFormSubmitSuccess = false;
  error: string | undefined;
  routerStore: RouterStore;

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
    const resp = await this.authService.signInWithEmailAndPassword(data);

    if (resp.data) {
      runInAction(() => {
        this.isFormSubmitSuccess = true;
      });

      this.routerStore.navigate('/sign-up');
    } else {
      this.error = resp.error.message;
    }
  }
}

const { createProvider, useStore } = createMobxContext<SignInStore>();

export const useSignInStore = useStore;

export const SignInStoreProvider = createProvider(() => {
  const routerStore = useRouterStore();
  return new SignInStore(new AuthService(authClient), routerStore);
});
