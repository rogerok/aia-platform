'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { useAgentsStore } from '@/_pages/agents/store/AgentsStore';
import { AgentFormAvatar } from '@/_pages/agents/ui/form/AgentFormAvatar';
import { TextAreaField } from '@/components/form/fields/TextAreaField/TextAreaField';
import { TextField } from '@/components/form/fields/TextField/TextField';
import { Form } from '@/components/form/Form/Form';
import { Button } from '@/components/ui/button';
import { MobxForm } from '@/lib/form/mobxForm';
import { AgentCreateModel, AgentModel } from '@/lib/models/agents';
import { RequestStore } from '@/lib/stores/requestStore';
import { cn } from '@/lib/utils';
import { trpcClient } from '@/trpc/client/trpcClient';

interface AgentFormProps {
  agent?: AgentModel;
  className?: string;
}

export const AgentForm: FC<AgentFormProps> = observer((props) => {
  const { agent, className } = props;

  const { dialog } = useAgentsStore();

  const [request] = useState(
    () => new RequestStore(trpcClient.agents.create.mutate),
  );

  const [form] = useState(
    () =>
      new MobxForm<AgentCreateModel>({
        defaultValues: {
          instructions: agent?.instructions ?? '',
          name: agent?.name ?? '',
        },
        onSubmit: (data) => request.execute(data),
        resolver: classValidatorResolver(AgentCreateModel),
      }),
  );

  return (
    <Form<AgentCreateModel>
      className={cn('flex flex-col gap-4', className)}
      methods={form}
    >
      <AgentFormAvatar />
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
          onClick={dialog.setFalse}
          type={'button'}
          variant={'ghost'}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
});
