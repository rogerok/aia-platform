'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStoreHydration } from '@/_pages/meetings/store/meetingsStore';
import { MeetingsListModel } from '@/lib/models/meetings/meetings';
import { MeetingsGetManyRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface MeetingsProps {
  data: MeetingsGetManyRouterOutput;
}

export const Meetings: FC<MeetingsProps> = observer((props) => {
  const store = useMeetingsStoreHydration((store) =>
    store.hydrate(plainToInstance(MeetingsListModel, props.data)),
  );

  return <div>{JSON.stringify(store.data)}</div>;
});
