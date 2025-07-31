import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/agentsStore';
import { AgentForm } from '@/_pages/agents/ui/form/AgentForm';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';

export const AgentDialog: FC = observer(() => {
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
