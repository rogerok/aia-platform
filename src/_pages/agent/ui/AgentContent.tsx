import { FC } from 'react';

import { useAgentStore } from '@/_pages/agent/store/agentStore';
import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { MeetingsCounter } from '@/components/custom/MeetingsCounter/MeetingsCounter';

export const AgentContent: FC = () => {
  const store = useAgentStore();

  return (
    store.agent && (
      <div className={'flex flex-col gap-4 rounded-lg border bg-white p-4'}>
        <div className={'col-span-5 flex flex-col gap-y-5'}>
          <div className={'flex items-center gap-x-3'}>
            <GeneratedAvatar firstName={store.agent.name} />
            <span className={'text-lg font-medium'}>{store.agent.name}</span>
          </div>
          <MeetingsCounter amount={5} />
        </div>
        <section className={'flex flex-col gap-4'}>
          <h3 className={'text-2xl'}>Instructions</h3>
          <p className={'text-muted-foreground font-medium'}>
            {store.agent.instructions}
          </p>
        </section>
      </div>
    )
  );
};
