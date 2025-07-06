'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { AuthProvidersType } from '@/lib/auth';
import { routes } from '@/lib/constants/routes';
import { MobxForm } from '@/lib/form/mobxForm';
import { AuthService } from '@/lib/services/authService';
import { RouterStore } from '@/lib/stores/routerStore';

export class AuthStore {
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
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    this.authService = authService;
    this.routerStore = routerStore;
  }

  async submitForm(data: AuthByEmailModel): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = undefined;
    });

    const resp = await this.authService.signInWithEmailAndPassword(data);

    runInAction(() => {
      this.loading = false;

      if (resp.data) {
        this.error = undefined;
        this.routerStore.navigate(routes.home());
      } else {
        this.error = resp.error.message;
      }
    });
  }

  async signInBySocial(provider: AuthProvidersType): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = undefined;
    });

    const resp = await this.authService.signInBySocial(provider);

    runInAction(() => {
      this.loading = false;

      if (resp.data) {
        this.error = undefined;
        this.routerStore.navigate(routes.home());
      } else {
        this.error = resp.error.message;
      }
    });
  }

  async logout(): Promise<void> {
    const resp = await this.authService.signOut();
    if (resp.data) {
      this.routerStore.navigate(routes.signIn());
    }
  }

  getSession() {
    return this.authService.useSession().data;
  }
}
