'use client';

import { OctagonAlert } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { routes } from '@/lib/constants/routes';
import {
  SignInStoreProvider,
  useSignInStore,
} from '@/modules/auth/stores/signInStore';
import { SignInForm } from '@/modules/auth/ui/signIn/SignInForm';

export const SignIn = observer(() => {
  const store = useSignInStore();

  return (
    <Card className={'flex flex-col gap-6 py-0'}>
      <CardContent className={'grid h-full gap-6 p-0 md:grid-cols-2'}>
        <div className={'flex flex-col gap-4 p-4'}>
          <p className={'text-center text-3xl font-semibold'}>Log in</p>
          <SignInForm />
          {store.error && (
            <Alert variant={'warn'}>
              <OctagonAlert className={'!text-destructive h-4 w-4'} />
              <AlertTitle>{store.error}</AlertTitle>
            </Alert>
          )}

          <div
            className={
              'bg-card text-card-foreground left:0 relative flex flex-col items-center gap-2 before:absolute before:-top-1 before:h-0.5 before:w-full before:bg-gray-300'
            }
          >
            <span>Or continue with</span>
            <div className={'flex w-full justify-center gap-1'}>
              <Button variant={'outline'}>Google</Button>
              <Button variant={'outline'}>GitHub</Button>
            </div>
          </div>
          <div>
            Do not have an account?{' '}
            <Link
              className={'underline underline-offset-4'}
              href={routes.signUp()}
            >
              Create
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
