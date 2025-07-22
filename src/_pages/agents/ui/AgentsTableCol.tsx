'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { Badge } from '@/components/ui/badge';
import { AgentModel } from '@/lib/models/agents/agents';

export const agentsColumns: ColumnDef<AgentModel>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className={'flex flex-col gap-y-1'}>
        <div className={'flex items-center gap-x-2'}>
          <GeneratedAvatar firstName={row.original.name} />
          <span className={'font-semibold capitalize'}>
            {row.original.name}
          </span>
        </div>
        <div className={'flex items-center gap-x-2'}>
          <CornerDownRightIcon className={'text-muted-foreground size-3'} />
          <span className={'max-w-[200px] truncate capitalize'}>
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
    header: 'Agent Name',
  },
  {
    accessorKey: 'meetingCount',
    cell: ({ row }) => (
      <Badge
        className={'flex items-center gap-x-2 [&>svg]:size-4'}
        variant={'secondary'}
      >
        <VideoIcon />
        {/*{row.original.meetingCount}*/}5
        {/*{row.original.meetingCount === 1 ? 'meeting' : 'meetings'}*/}
      </Badge>
    ),
    header: 'Meetings',
  },
];
