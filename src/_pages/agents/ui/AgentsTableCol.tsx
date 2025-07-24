'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CornerDownRightIcon } from 'lucide-react';
import Link from 'next/link';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { MeetingsCounter } from '@/components/custom/MeetingsCounter/MeetingsCounter';
import { routes } from '@/lib/constants/routes';
import { AgentModel } from '@/lib/models/agents/agents';

export const agentsColumns: ColumnDef<AgentModel>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <Link href={routes.agent(row.original.id)}>
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
      </Link>
    ),
    header: 'Agent Name',
  },
  {
    accessorKey: 'meetingCount',
    cell: ({ row }) => <MeetingsCounter amount={5} />,
    header: 'Meetings',
  },
];
