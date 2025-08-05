'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStore } from '@/_pages/meetings/store/meetingsStore';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { AgentSelect } from '@/components/form/selects/AgentSelect';
import { Button } from '@/components/ui/button';
import { MeetingCreateModel } from '@/lib/models/meetings/meetings';

export const MeetingCreateForm: FC = observer(() => {
  const { closeFormDialog, form } = useMeetingsStore();

  return (
    <Form<MeetingCreateModel> className={'flex flex-col gap-4'} methods={form}>
      <TextField
        label={'Name'}
        name={'name'}
        placeholder={'Name'}
        type={'text'}
      />
      <AgentSelect />
      <div className={'flex gap-8'}>
        <Button disabled={form.submitting} type={'submit'}>
          Submit
        </Button>
        <Button
          disabled={form.submitting}
          onClick={closeFormDialog}
          type={'button'}
          variant={'ghost'}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
});
