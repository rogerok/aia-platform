'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStoreHydration } from '@/_pages/agents/store/AgentsStore';
import { agentsColumns } from '@/_pages/agents/ui/AgentsTableCol';
import { DataTable } from '@/components/table/DataTable';
import { AgentModel } from '@/lib/models/agents';
import { AgentRouterOutput } from '@/trpc/server/routers/agents';

interface AgentsProps {
  data: AgentRouterOutput[];
  className?: string;
}

export const Agents: FC<AgentsProps> = observer((props) => {
  const store = useAgentsStoreHydration((store) =>
    store.init(plainToInstance(AgentModel, props.data)),
  );

  return (
    !!store.data.length && (
      <div
        className={'bg-muted flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'}
      >
        <DataTable columns={agentsColumns} data={store.data} />
      </div>
    )
  );
});
