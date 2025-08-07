'use client';
import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useCallStoreHydration } from '@/_pages/call/store/callStore';
import { MeetingModel } from '@/lib/models/meetings/meetings';
import { MeetingsGetOneRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface CallProps {
  data: MeetingsGetOneRouterOutput;
}

export const Call: FC<CallProps> = observer((props) => {
  const { data } = props;
  const store = useCallStoreHydration((store) =>
    store.hydrate(plainToInstance(MeetingModel, data)),
  );

  return <div className={'text-white'}>{store.meeting.status}</div>;
});
