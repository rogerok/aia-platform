'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useRootStore } from '@/lib/stores/rootStore';

export const Dashboard: FC = observer(() => {
  const { authStore } = useRootStore();

  return (
    <div
      className={'flex h-screen w-full flex-col items-center justify-center'}
    >
      <Button disabled={authStore.loading} onClick={authStore.signOut}>
        Sign out
      </Button>
    </div>
  );
});
