import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { SignUpModel } from '@/_pages/signUp/models/signUp';
import { MobxForm } from '@/lib/form/mobxForm';
import { AuthService } from '@/lib/services/authService';

export class SignUpStore {
  error: string | undefined;

  form = new MobxForm<SignUpModel>({
    abortController: new AbortController(),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
    lazyUpdates: false,
    onSubmit: this.submitForm.bind(this),
    resolver: classValidatorResolver(SignUpModel),
  });

  constructor(protected service: AuthService) {
    makeAutoObservable(this);
  }

  async submitForm(data: SignUpModel): Promise<void> {
    const resp = await this.service.signUp(data);

    if (resp.error) {
      runInAction(() => {
        this.error = resp.error.message;
      });
    }
  }
}
