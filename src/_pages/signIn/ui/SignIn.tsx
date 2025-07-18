'use client';

import { OctagonAlert } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import { SignInForm } from '@/_pages/signIn/ui/SignInForm';
import { Logo } from '@/components/custom/Logo/Logo';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { routes } from '@/lib/constants/routes';
import { useRootStore } from '@/lib/stores/rootStore';

export const SignIn = observer(() => {
  const { authStore } = useRootStore();

  return (
    <Card className={'flex flex-col gap-6 py-0'}>
      <CardContent className={'grid h-full gap-6 p-0 md:grid-cols-2'}>
        <div className={'flex flex-col gap-4 p-4'}>
          <p className={'text-center text-3xl font-semibold'}>Log in</p>
          <SignInForm />
          {authStore.error && (
            <Alert variant={'warn'}>
              <OctagonAlert className={'!text-destructive h-4 w-4'} />
              <AlertTitle>{authStore.error}</AlertTitle>
            </Alert>
          )}

          <div
            className={
              'bg-card text-card-foreground left:0 relative flex flex-col items-center gap-2 before:absolute before:-top-1 before:h-0.5 before:w-full before:bg-gray-300'
            }
          >
            <span>Or continue with</span>
            <div className={'flex w-full justify-center gap-1'}>
              <Button
                disabled={authStore.loading}
                onClick={() => authStore.signInBySocial('google')}
                variant={'outline'}
              >
                Google
              </Button>
              <Button
                disabled={authStore.loading}
                onClick={() => authStore.signInBySocial('github')}
                variant={'outline'}
              >
                GitHub
              </Button>
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
          <Logo />
          <p className={'text-accent self-center text-2xl font-semibold'}>
            AIA Platform
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
