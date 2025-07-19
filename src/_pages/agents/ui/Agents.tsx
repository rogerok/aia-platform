'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStoreHydration } from '@/_pages/agents/store/AgentsStore';
import { agentsColumns } from '@/_pages/agents/ui/AgentsTableCol';
import { EmptyListIndicator } from '@/components/custom/EmptyListIndicator/EmptyListIndicator';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { AgentModel } from '@/lib/models/agents/agents';
import { AgentRouterOutput } from '@/lib/models/agents/agentsOutput';

interface AgentsProps {
  data: AgentRouterOutput[];
  className?: string;
}

export const Agents: FC<AgentsProps> = observer((props) => {
  const store = useAgentsStoreHydration((store) =>
    store.init(plainToInstance(AgentModel, props.data)),
  );

  return (
    <div className={'bg-muted flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'}>
      {store.data.length ? (
        <DataTable columns={agentsColumns} data={store.data} />
      ) : (
        <EmptyListIndicator
          description={
            'Create agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
          }
          title={'Create your first agent'}
        />
      )}
      <Button
        onClick={() =>
          store.searchParamsHandler.setQueryParams({
            page: 1,
            pageSize: 20,
            search: '12ss3',
          })
        }
      >
        set params
      </Button>
    </div>
  );
});
