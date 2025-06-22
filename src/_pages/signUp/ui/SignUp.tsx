'use client';

import { OctagonAlert } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import { SignUpModel } from '@/_pages/signUp/models/signUp';
import { SignUpStore } from '@/_pages/signUp/store/signUpStore';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/auth';
import { routes } from '@/lib/constants/routes';
import { AuthService } from '@/lib/services/authService';

export const SignUp: FC = observer(() => {
  const [store] = useState(() => new SignUpStore(new AuthService(authClient)));

  return (
    <Card className={'flex flex-col gap-6 py-0'}>
      <CardContent className={'grid h-full gap-6 p-0 md:grid-cols-2'}>
        <div className={'flex flex-col gap-4 p-4'}>
          <p className={'text-center text-3xl font-semibold'}>Sign up</p>
          <Form<SignUpModel>
            className={'flex flex-col gap-4'}
            methods={store.form}
          >
            <TextField label={'Name'} name={'name'} placeholder={'Name'} />
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
            <TextField
              label={'Confirm password'}
              name={'passwordConfirm'}
              placeholder={'Confirm password'}
              type={'password'}
            />
            <Button
              className={'w-full'}
              disabled={store.form.submitting}
              type={'submit'}
            >
              Submit
            </Button>
          </Form>
          {store.error && (
            <Alert variant={'warn'}>
              <OctagonAlert className={'!text-destructive h-4 w-4'} />
              <AlertTitle>{store.error}</AlertTitle>
            </Alert>
          )}
          <div>
            Have an account?{' '}
            <Link
              className={'underline underline-offset-4'}
              href={routes.signIn()}
            >
              Sign in
            </Link>
          </div>
        </div>
        <div
          className={
            'relative hidden h-full w-full flex-col items-center justify-center gap-4 rounded-tr-xl rounded-br-xl bg-radial from-cyan-50 to-gray-900 md:flex'
          }
        >
          <Image
            alt={'logo'}
            className={'h-[120px] w-[120px]'}
            height={120}
            src={'./logo.svg'}
            width={120}
          />
          <p className={'text-accent self-center text-2xl font-semibold'}>
            AIA Platform
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
