'use client';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { AgentModel } from '@/lib/models/agents';
import { RequestStore } from '@/lib/stores/requestStore';
import { trpcClient } from '@/trpc/client/trpcClient';

interface AgentsProps {
  data: AgentModel[];
  className?: string;
}

export const Agents: FC<AgentsProps> = observer((props) => {
  const [request] = useState(
    () => new RequestStore(trpcClient.agents.getMany.query),
  );

  useEffect(() => {
    request.execute();
  }, []);

  if (request.result.status === 'loading') {
    return <Loader />;
  }

  if (request.result.status === 'error') {
    return <ShowError description={request.result.error} />;
  }

  return (
    request.result.status === 'success' && (
      <div>
        {request.result.data[0].name} {props.data[0].createdAt.toString()}
      </div>
    )
  );
});
