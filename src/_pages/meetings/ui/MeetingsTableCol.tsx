'use client';
import { ColumnDef } from '@tanstack/react-table';
import humanizeDuration from 'humanize-duration';
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { routes } from '@/lib/constants/routes';
import {
  MeetingsListItemModel,
  MeetingStatusType,
} from '@/lib/models/meetings/meetings';

const formatDuration = (ms: number) => {
  return humanizeDuration(ms * 1000, {
    largest: 1,
    round: true,
    units: ['h', 'm', 's'],
  });
};

const statusIconMap: Record<MeetingStatusType, ReactNode> = {
  active: <LoaderIcon />,
  canceled: <CircleXIcon />,
  completed: <CircleCheckIcon />,
  processing: <LoaderIcon />,
  upcoming: <ClockArrowUpIcon />,
};

const statusColorMap: Record<MeetingStatusType, string> = {
  active: 'bg-blue-500/200 text-blue-800 border-blue-800/5',
  canceled: 'bg-rose-500/200 text-rose-800 border-rose-800/5',
  completed: 'bg-emerald-500/200 text-emerald-800 border-emerald-800/5',
  processing: 'bg-gray-500/200 text-gray-800 border-gray-800/5',
  upcoming: 'bg-yellow-500/200 text-yellow-800 border-yellow-800/5',
};

export const meetingsColumns: ColumnDef<MeetingsListItemModel>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <Link href={routes.agent(row.original.id)}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex items-center gap-x-2'}>
            <span className={'font-semibold capitalize'}>
              {row.original.name}
            </span>
          </div>
          <div className={'flex items-center gap-x-2'}>
            <CornerDownRightIcon className={'text-muted-foreground size-3'} />
            <span className={'max-w-[200px] truncate capitalize'}>
              {/*{row.original.instructions}*/}
            </span>
          </div>
        </div>
      </Link>
    ),
    header: 'Meeting Name',
  },
  // {
  //   accessorKey: 'meetingCount',
  //   cell: ({ row }) => <MeetingsCounter amount={5} />,
  //   header: 'Meetings',
  // },
];
