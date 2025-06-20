'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { authClient } from '@/lib/auth';
import { MobxForm } from '@/lib/form/mobxForm';
import { createMobxContext } from '@/lib/store-adapter/storeAdapter';
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

  constructor(authService: AuthService) {
    this.authService = authService;

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

    runInAction(() => {
      if (resp.data) {
        this.isFormSubmitSuccess = true;
      } else {
        this.error = resp.error.message;
      }
    });
  }
}

const { createProvider, useStore } = createMobxContext<SignInStore>();

export const useSignInStore = useStore;

export const SignInStoreProvider = createProvider(
  () => new SignInStore(new AuthService(authClient)),
);
