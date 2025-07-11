import { Agents } from '@/_pages/agents/ui/Agents';
import { handleIsNotAuth } from '@/lib/authActions';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const Page = async () => {
  await handleIsNotAuth();
  const queryClient = await trpcServerClient.agents.getMany.query();

  // return <Agents data={queryClient} />;
  return <div />;
};

export default Page;
