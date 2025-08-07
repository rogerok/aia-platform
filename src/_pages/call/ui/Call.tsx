'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useCallStoreHydration } from '@/_pages/call/store/callStore';
import { CallProvider } from '@/_pages/call/ui/CallProvider';
import { ShowError } from '@/components/custom/Error/ShowError';
import {
  MeetingModel,
  MeetingStatusConstant,
} from '@/lib/models/meetings/meetings';
import { MeetingsGetOneRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface CallProps {
  data: MeetingsGetOneRouterOutput;
}

export const Call: FC<CallProps> = observer((props) => {
  const { data } = props;
  const store = useCallStoreHydration((store) =>
    store.hydrate(plainToInstance(MeetingModel, data)),
  );

  if (store.meeting.status === MeetingStatusConstant.completed) {
    return (
      <div className={'flex h-screen items-center justify-center'}>
        <ShowError
          description={'You can no longer join this meeting'}
          title={'Meeting has ended'}
        />
      </div>
    );
  }

  return (
    <div className={'text-white'}>
      <CallProvider />
    </div>
  );
});
