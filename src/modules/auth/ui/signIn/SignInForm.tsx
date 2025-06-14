import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth';
import { MobxForm } from '@/lib/form/mobxForm';
import { AuthByEmailModel } from '@/modules/auth/models/auth';
import { AuthService } from '@/modules/auth/services/authService';

export const SignInForm: FC = observer(() => {
  const [form] = useState(
    () =>
      new MobxForm<AuthByEmailModel>({
        abortController: new AbortController(),
        defaultValues: {
          email: '',
          password: '',
        },
        lazyUpdates: false,
        onSubmit: async (data) =>
          await new AuthService(authClient).signInWithEmailAndPassword(data),
        resolver: classValidatorResolver(AuthByEmailModel),
      }),
  );

  return (
    <Form<AuthByEmailModel> className={'flex flex-col gap-4'} methods={form}>
      <TextField
        label={'Email'}
        name={'email'}
        placeholder={'Email'}
        type={'email'}
      />
      <TextField
        label={'Password'}
        name={'password'}
        placeholder={'Password'}
        type={'password'}
      />

      <Button className={'w-full'} type={'submit'}>
        Submit
      </Button>
    </Form>
  );
});
