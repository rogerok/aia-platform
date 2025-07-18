'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AgentModel } from '@/lib/models/agents';

export const agentsColumns: ColumnDef<AgentModel>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
  },
];
