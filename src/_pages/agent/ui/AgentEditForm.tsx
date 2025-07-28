import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentStore } from '@/_pages/agent/store/agentStore';
import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';
import { TextAreaField } from '@/components/form/fields/TextAreaField/TextAreaField';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { AgentEditModel } from '@/lib/models/agents/agents';

export const AgentEditForm: FC = observer(() => {
  const { closeEditForm, editDialog, editForm } = useAgentStore();

  return (
    <ResponsiveDialog
      onOpenChange={editDialog.setValue}
      open={editDialog.value}
    >
      <Form<AgentEditModel>
        className={'flex flex-col gap-4'}
        methods={editForm}
      >
        <TextField
          label={'Name'}
          name={'name'}
          placeholder={'Name'}
          type={'text'}
        />
        <TextAreaField
          label={'Instructions'}
          name={'instructions'}
          placeholder={'Instructions'}
        />
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
