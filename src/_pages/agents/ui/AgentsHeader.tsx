'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/AgentsStore';
import { AgentDialog } from '@/_pages/agents/ui/AgentDialog';
import { AgentsSearchFilter } from '@/_pages/agents/ui/AgentsSearchFilter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgentsHeaderProps {
  className?: string;
}

export const AgentsHeader: FC<AgentsHeaderProps> = observer((props) => {
  const { dialog } = useAgentsStore();

  return (
    <div
      className={cn(
        'p-x-4 md:p-x-8 flex w-full flex-col pt-4',
        props.className,
      )}
    >
      <div className={'flex w-full items-center justify-between'}>
        <h5 className={'text-xl' + ' font-medium'}>My agents</h5>
        <Button onClick={dialog.setTrue}>New agent</Button>
      </div>
      <AgentsSearchFilter />
      <AgentDialog />
    </div>
  );
});
