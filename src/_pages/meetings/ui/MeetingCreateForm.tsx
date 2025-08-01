'use client';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useMeetingsStore } from '@/_pages/meetings/store/meetingsStore';
import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { CommandSelect } from '@/components/form/fields/Select/CommandSelect';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { MeetingCreateModel } from '@/lib/models/meetings/meetings';

export const MeetingCreateForm: FC = observer(() => {
  const {
    agents,
    closeFormDialog,
    form,
    getAgents,
    isAgentsLoading,
    searchAgents,
  } = useMeetingsStore();

  useEffect(() => {
    void getAgents();
  }, [getAgents]);

  return (
    <Form<MeetingCreateModel> className={'flex flex-col gap-4'} methods={form}>
      <TextField
        label={'Name'}
        name={'name'}
        placeholder={'Name'}
        type={'text'}
      />

      <CommandSelect
        label={'Agent'}
        loading={isAgentsLoading}
        name={'agentId'}
        onSearch={searchAgents}
        options={agents.items.map((agent) => ({
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
        value={form.values.agentId}
      />
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
