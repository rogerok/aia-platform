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
    onSubmit: this.submitForm,
    resolver: classValidatorResolver(AuthByEmailModel),
  });

  authService: AuthService;

  constructor(authService: AuthService) {
    makeAutoObservable(this);
    this.authService = authService;
  }

  async submitForm(data: AuthByEmailModel): Promise<void> {
    await this.authService.signInWithEmailAndPassword(data);
  }
}

const { createProvider, useStore: useSignInStore } =
  createMobxContext<SignInStore>();

const SignInStoreProvider = createProvider(
  () => new SignInStore(new AuthService(authClient)),
);
