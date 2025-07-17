import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/AgentsStore';
import { AgentForm } from '@/_pages/agents/ui/form/AgentForm';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';

interface AgentDialogProps {
  className?: string;
}

export const AgentDialog: FC<AgentDialogProps> = observer((props) => {
  const { dialog, form } = useAgentsStore();

  return (
    <ResponsiveDialog
      onClose={form.resetForm}
      onOpenChange={dialog.setValue}
      open={dialog.value}
    >
      <AgentForm />
    </ResponsiveDialog>
  );
});
