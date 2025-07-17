'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/AgentsStore';
import { AgentFormAvatar } from '@/_pages/agents/ui/form/AgentFormAvatar';
import { TextAreaField } from '@/components/form/fields/TextAreaField/TextAreaField';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { AgentCreateModel } from '@/lib/models/agents';
import { cn } from '@/lib/utils';

interface AgentFormProps {
  className?: string;
}

export const AgentForm: FC<AgentFormProps> = observer((props) => {
  const { className } = props;

  const { closeFormDialog, form } = useAgentsStore();

  return (
    <Form<AgentCreateModel>
      className={cn('flex flex-col gap-4', className)}
      methods={form}
    >
      <AgentFormAvatar name={form.values.name} />
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
