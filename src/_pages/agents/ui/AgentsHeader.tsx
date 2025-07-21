'use client';

import { XCircleIcon } from 'lucide-react';
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
  const { dialog, searchParamsHandler } = useAgentsStore();

  return (
    <div className={cn('flex w-full flex-col p-4 md:p-8', props.className)}>
      <div className={'flex w-full items-center justify-between'}>
        <h5 className={'text-xl' + ' font-medium'}>My agents</h5>
        <Button onClick={dialog.setTrue}>New agent</Button>
      </div>
      <div className={'flex items-center gap-x-2'}>
        <AgentsSearchFilter />
        {!!searchParamsHandler?.params.search && (
          <Button
            onClick={() => searchParamsHandler?.setParam('search', '')}
            variant={'outline'}
          >
            <XCircleIcon />
          </Button>
        )}
      </div>
      <AgentDialog />
    </div>
  );
});
