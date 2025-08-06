'use client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import humanizeDuration from 'humanize-duration';
import { CornerDownRightIcon } from 'lucide-react';
import Link from 'next/link';

import { statusIconMap } from '@/_pages/meetings/lib/constants';
import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { Badge } from '@/components/ui/badge';
import { routes } from '@/lib/constants/routes';
import {
  MeetingModel,
  MeetingStatusType,
} from '@/lib/models/meetings/meetings';
import { cn } from '@/lib/utils';

const formatDuration = (ms: number) => {
  return humanizeDuration(ms * 1000, {
    largest: 1,
    round: true,
    units: ['h', 'm', 's'],
  });
};

const statusColorMap: Record<MeetingStatusType, string> = {
  active: 'bg-blue-500/200 text-blue-800 border-blue-800/5',
  cancelled: 'bg-rose-500/200 text-rose-800 border-rose-800/5',
  completed: 'bg-emerald-500/200 text-emerald-800 border-emerald-800/5',
  processing: 'bg-gray-500/200 text-gray-800 border-gray-800/5',
  upcoming: 'bg-yellow-500/200 text-yellow-800 border-yellow-800/5',
};

export const MeetingsTableCol: ColumnDef<MeetingModel>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <Link href={routes.meeting(row.original.id)}>
        <div className={'flex flex-col gap-y-1'}>
          <span className={'font-semibold capitalize'}>
            {row.original.name}
          </span>

          <div className={'flex items-center gap-x-2'}>
            <div className={'gap flex items-center gap-x-1'}>
              <CornerDownRightIcon className={'text-muted-foreground size-3'} />
              <span className={'max-w-[200px] truncate capitalize'}>
                {row.original.agent.name}
              </span>
            </div>
            <GeneratedAvatar
              className={'size-4'}
              firstName={row.original.agent.name}
            />
            {!!row.original.startedAt && (
              <span className={'text-muted-foreground text-sm'}>
                {format(row.original.startedAt, 'MMM d')}
              </span>
            )}
          </div>
        </div>
      </Link>
    ),
    header: 'Meeting Name',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      const icon = statusIconMap[row.original.status];

      return (
        <Badge
          className={cn(
            'text-muted-foreground capitalize [&>svg]:size-4',
            statusColorMap[row.original.status],
          )}
          variant={'outline'}
        >
          {icon}
          {row.original.status}
        </Badge>
      );
    },
    header: 'Status',
  },
  {
    accessorKey: 'duration',
    cell: ({ row }) => {
      return (
        <Badge
          className={'flex items-center capitalize [&>svg]:size-4'}
          variant={'outline'}
        >
          {row.original.duration
            ? formatDuration(row.original.duration)
            : 'No duration'}
        </Badge>
      );
    },
    header: 'Duration',
  },
];
