import { VideoIcon } from 'lucide-react';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';

interface MeetingsCounterProps {
  amount: number;
}

export const MeetingsCounter: FC<MeetingsCounterProps> = (props) => {
  return (
    <Badge
      className={'flex items-center gap-x-2 [&>svg]:size-4'}
      variant={'secondary'}
    >
      <VideoIcon />
      {props.amount} {props.amount === 1 ? 'meeting' : 'meetings'}
    </Badge>
  );
};
