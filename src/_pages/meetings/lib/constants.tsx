import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

import { MeetingStatusType } from '@/lib/models/meetings/meetings';

export const statusIconMap: Record<MeetingStatusType, ReactNode> = {
  active: <LoaderIcon />,
  cancelled: <CircleXIcon />,
  completed: <CircleCheckIcon />,
  processing: <LoaderIcon />,
  upcoming: <ClockArrowUpIcon />,
};
