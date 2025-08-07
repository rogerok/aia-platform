'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useCallStore } from '@/_pages/call/store/callStore';
import { CallConnect } from '@/_pages/call/ui/CallConnect';
import { Loader } from '@/components/custom/Loader/Loader';
import { useRootStore } from '@/lib/stores/rootStore';

export const CallProvider: FC = observer(() => {
  const { authStore } = useRootStore();
  const { data: session, isPending } = authStore.useSession();

  const { meeting } = useCallStore();

  if (!session || isPending) {
    return <Loader />;
  }

  return (
    <CallConnect
      meetingId={meeting.id}
      meetingName={meeting.name}
      userId={session.user.id}
      userName={session.user.name}
    />
  );
});
