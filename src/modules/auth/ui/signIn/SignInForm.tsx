import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FC, useState } from 'react';

import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { MobxForm } from '@/lib/form/mobxForm';
import { AuthModel } from '@/modules/auth/models/auth';

export const SignInForm: FC = () => {
  const [form] = useState(
    () =>
      new MobxForm<AuthModel>({
        abortController: new AbortController(),
        defaultValues: {
          email: '',
          password: '',
        },
        lazyUpdates: false,
        onSubmit: (values) => {
          console.log(values);
        },
        resolver: classValidatorResolver(AuthModel),
      }),
  );

  return (
    <Form<AuthModel> className={'flex flex-col gap-4'} methods={form}>
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
};
