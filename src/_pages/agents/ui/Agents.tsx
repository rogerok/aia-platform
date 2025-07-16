'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStoreHydration } from '@/_pages/agents/store/AgentsStore';
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

  return store.data.length ? (
    <div>
      {store.data[0]?.createdAt}
      {/*<ResponsiveDialog open>asdadsad</ResponsiveDialog>*/}
    </div>
  ) : null;
});
