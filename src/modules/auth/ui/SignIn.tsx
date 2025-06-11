'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobxForm } from '@/lib/form/mobxForm';

type TestForm = {
  email: string;
  name: string;
  password: string;
};

export const SignIn = observer(() => {
  const [form] = useState(
    () =>
      new MobxForm<TestForm>({
        abortController: new AbortController(),
        defaultValues: {
          email: '',
          name: '',
          password: '',
        },
        lazyUpdates: false,
        onSubmit: (values) => {
          console.log(values);
        },
      }),
  );

  return (
    <Card className={'flex flex-col gap-6 py-0'}>
      <CardContent className={'grid h-full gap-6 p-0 md:grid-cols-2'}>
        <Form<TestForm> className={'flex flex-col gap-4 p-4'} methods={form}>
          <TextField label={'Email'} name={'email'} placeholder={'Email'} />
          <TextField
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
          />
          <Button type={'submit'}>Submit</Button>
        </Form>
        <div
          className={
            'relative hidden h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-radial from-cyan-50 to-gray-900 md:flex'
          }
        >
          <img
            alt={'logo'}
            className={'h-[120px] w-[120px]'}
            src={'./logo.svg'}
          />
          <p className={'text-accent self-center text-2xl font-semibold'}>
            AIA Platform
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
