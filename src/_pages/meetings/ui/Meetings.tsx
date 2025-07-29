import { FC } from 'react';

import { MeetingsGetManyRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface MeetingsProps {
  data: MeetingsGetManyRouterOutput;
}

export const Meetings: FC<MeetingsProps> = (props) => {
  return <div>{JSON.stringify(props.data)}</div>;
};
