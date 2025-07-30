'use client';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { MeetingsGetManyRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface MeetingsProps {
  data: MeetingsGetManyRouterOutput;
}

export const Meetings: FC<MeetingsProps> = observer((props) => {
  return <div>{JSON.stringify(props.data)}</div>;
});
