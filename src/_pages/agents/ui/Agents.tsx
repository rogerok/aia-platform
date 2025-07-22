'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStoreHydration } from '@/_pages/agents/store/AgentsStore';
import { AgentsHeader } from '@/_pages/agents/ui/AgentsHeader';
import { agentsColumns } from '@/_pages/agents/ui/AgentsTableCol';
import { EmptyListIndicator } from '@/components/custom/EmptyListIndicator/EmptyListIndicator';
import { DataPagination } from '@/components/table/DataPagination';
import { DataTable } from '@/components/table/DataTable';
import { AgentsListModel } from '@/lib/models/agents/agents';
import { AgentRouterOutput } from '@/lib/models/agents/agentsOutput';

interface AgentsProps {
  data: AgentRouterOutput;
  className?: string;
}

export const Agents: FC<AgentsProps> = observer((props) => {
  const store = useAgentsStoreHydration((store) =>
    store.hydrate(plainToInstance(AgentsListModel, props.data)),
  );

  return (
    <div className={'bg-muted flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'}>
      <AgentsHeader />
      {store.data.isNotEmpty ? (
        <>
          <DataTable columns={agentsColumns} data={store.data.items} />
          {store.searchParamsHandler && (
            <DataPagination
              onPageChange={store.handlePaginationChange}
              page={store.searchParamsHandler.getParam('page')}
              totalPages={store.data.totalPages}
            />
          )}
        </>
      ) : (
        <EmptyListIndicator title={'There is no agents'} />
      )}
    </div>
  );
});
