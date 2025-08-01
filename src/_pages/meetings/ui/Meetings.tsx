'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStoreHydration } from '@/_pages/meetings/store/meetingsStore';
import { MeetingsHeader } from '@/_pages/meetings/ui/MeetingsHeader';
import { MeetingsListModel } from '@/lib/models/meetings/meetings';
import { MeetingsGetManyRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface MeetingsProps {
  data: MeetingsGetManyRouterOutput;
}

export const Meetings: FC<MeetingsProps> = observer((props) => {
  const store = useMeetingsStoreHydration((store) =>
    store.hydrate(plainToInstance(MeetingsListModel, props.data)),
  );

  return (
    <div className={'bg-muted flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'}>
      <MeetingsHeader />
      {JSON.stringify(store.meetings)}
    </div>
  );
});
