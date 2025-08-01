import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStore } from '@/_pages/meetings/store/meetingsStore';
import { MeetingCreateForm } from '@/_pages/meetings/ui/MeetingCreateForm';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';

export const MeetingsDialog: FC = observer(() => {
  const { closeFormDialog, dialog } = useMeetingsStore();

  return (
    <ResponsiveDialog
      description={'Create new meeting'}
      onClose={closeFormDialog}
      onOpenChange={dialog.setValue}
      open={dialog.value}
      title={'New meeting'}
    >
      <MeetingCreateForm />
    </ResponsiveDialog>
  );
});
