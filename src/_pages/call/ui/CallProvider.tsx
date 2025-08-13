'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { CallConnect } from '@/_pages/call/ui/CallConnect';
import { Loader } from '@/components/custom/Loader/Loader';
import { useRootStore } from '@/lib/stores/rootStore';

export const CallProvider: FC = observer(() => {
  const { authStore } = useRootStore();
  const { data: session, isPending } = authStore.useSession();

  if (!session || isPending) {
    return <Loader className={'h-screen'} />;
  }

  return <CallConnect userId={session.user.id} userName={session.user.name} />;
});
