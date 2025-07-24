'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentStoreHydration } from '@/_pages/agent/store/agentStore';
import { AgentActionsDropdown } from '@/_pages/agent/ui/AgentActionsDropdown';
import { AgentBreadcrumbs } from '@/_pages/agent/ui/AgentBreadcrumbs';
import { AgentContent } from '@/_pages/agent/ui/AgentContent';
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
    store.data && (
      <div>
        <div className={'flex items-center justify-between p-4'}>
          <AgentBreadcrumbs />
          <AgentActionsDropdown />
        </div>
        <AgentContent />
      </div>
    )
  );
});
