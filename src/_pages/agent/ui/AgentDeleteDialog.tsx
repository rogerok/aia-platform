'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentStore } from '@/_pages/agent/store/agentStore';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';
import { Button } from '@/components/ui/button';

interface AgentDeleteDialogProps {
  className?: string;
}

export const AgentDeleteDialog: FC<AgentDeleteDialogProps> = observer(() => {
  const store = useAgentStore();

  return (
    store.agent && (
      <ResponsiveDialog
        onOpenChange={store.deleteDialog.setValue}
        open={store.deleteDialog.value}
      >
        <div className={'flex flex-col gap-4'}>
          <h4 className={'text-center text-xl'}>
            Do you want to delete {store.agent.name} agent?
          </h4>
          <div className={'mt-4 flex justify-between'}>
            <Button onClick={store.delete} variant={'destructive'}>
              Delete
            </Button>
            <Button onClick={store.deleteDialog.setFalse}>Cancel</Button>
          </div>
        </div>
      </ResponsiveDialog>
    )
  );
});
