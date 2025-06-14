'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable } from 'mobx';

import { authClient } from '@/lib/auth';
import { MobxForm } from '@/lib/form/mobxForm';
import { createMobxContext } from '@/lib/store-adapter/store';
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
    onSubmit: (data) => this.submitForm(data),
    resolver: classValidatorResolver(AuthByEmailModel),
  });

  authService: AuthService;

  constructor(authService: AuthService) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    this.authService = authService;
  }

  async submitForm(data: AuthByEmailModel): Promise<void> {
    await this.authService.signInWithEmailAndPassword(data);
  }
}

const { createProvider, useStore } = createMobxContext<SignInStore>();

export const useSignInStore = useStore;

export const SignInStoreProvider = createProvider(
  () => new SignInStore(new AuthService(authClient)),
);
