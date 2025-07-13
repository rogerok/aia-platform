'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { useFormContext } from '@/lib/form/formContext';
import { AgentCreateModel } from '@/lib/models/agents';

export const AgentFormAvatar: FC = observer(() => {
  const form = useFormContext<AgentCreateModel>();

  return <GeneratedAvatar firstName={form.values.name} />;
});
