import { plainToInstance } from 'class-transformer';

import { Agents } from '@/_pages/agents/ui/Agents';
import { handleIsNotAuth } from '@/lib/authActions';
import { AgentModel } from '@/lib/models/agents';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const Page = async () => {
  await handleIsNotAuth();
  const queryClient = await trpcServerClient.agents.getMany.query();

  return <Agents data={plainToInstance(AgentModel, queryClient)} />;
};

export default Page;
