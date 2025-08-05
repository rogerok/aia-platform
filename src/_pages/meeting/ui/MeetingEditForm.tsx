import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { AgentSelect } from '@/components/form/selects/AgentSelect';
import { Button } from '@/components/ui/button';
import { MeetingEditModel } from '@/lib/models/meetings/meetings';

export const MeetingEditForm: FC = observer(() => {
  const { closeEditForm, editDialog, editForm } = useMeetingStore();

  return (
    <ResponsiveDialog
      onOpenChange={editDialog.setValue}
      open={editDialog.value}
    >
      <Form<MeetingEditModel>
        className={'flex flex-col gap-4'}
        methods={editForm}
      >
        <TextField
          label={'Name'}
          name={'name'}
          placeholder={'Name'}
          type={'text'}
        />
        <AgentSelect />
        <div className={'flex gap-8'}>
          <Button disabled={editForm.submitting} type={'submit'}>
            Submit
          </Button>
          <Button
            disabled={editForm.submitting}
            onClick={closeEditForm}
            type={'button'}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </ResponsiveDialog>
  );
});
