'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentStoreHydration } from '@/_pages/agent/store/agentStore';
import { AgentActionsDropdown } from '@/_pages/agent/ui/AgentActionsDropdown';
import { AgentBreadcrumbs } from '@/_pages/agent/ui/AgentBreadcrumbs';
import { AgentContent } from '@/_pages/agent/ui/AgentContent';
import { AgentDeleteDialog } from '@/_pages/agent/ui/AgentDeleteDialog';
import { AgentModel } from '@/lib/models/agents/agents';
import { AgentGetOneRouterOutput } from '@/lib/models/agents/agentsOutput';

interface AgentProps {
  data: AgentGetOneRouterOutput;
}

export const Agent: FC<AgentProps> = observer((props) => {
  const store = useAgentStoreHydration((store) =>
    store.hydrate(plainToInstance(AgentModel, props.data)),
  );

  return (
    store.agent && (
      <>
        <div className={'bg-muted flex flex-1 flex-col gap-y-4 p-4'}>
          <div className={'flex items-center justify-between'}>
            <AgentBreadcrumbs />
            <AgentActionsDropdown />
          </div>
          <AgentContent />
        </div>
        <AgentDeleteDialog />
      </>
    )
  );
});
