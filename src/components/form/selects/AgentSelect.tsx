'use client';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { CommandSelect } from '@/components/form/fields/Select/CommandSelect';
import { AgentSelectStore } from '@/components/form/selects/agentSelectStore';

export const AgentSelect: FC = observer(() => {
  const [store] = useState(() => new AgentSelectStore());

  useEffect(() => {
    if (!store.agents.items) {
      void store.getAgents();
    }
  }, [store]);

  return (
    <CommandSelect
      label={'Agent'}
      loading={store.isLoading}
      name={'agentId'}
      onOpenChange={store.handleSelectOpen}
      onSearch={store.searchAgents}
      options={store.agents.items.map((agent) => ({
        children: (
          <div className={'flex items-center gap-x-2'}>
            <GeneratedAvatar firstName={agent.name} />
            <span>{agent.name}</span>
          </div>
        ),
        id: agent.id,
        value: agent.id,
      }))}
      placeholder={'Select an agent'}
    />
  );
});
