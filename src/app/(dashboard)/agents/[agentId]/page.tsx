import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AgentStoreProvider } from '@/_pages/agent/store/agentStore';
import { Agent } from '@/_pages/agent/ui/Agent';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

interface PageProps {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: PageProps) => {
  await handleIsNotAuth();
  const { agentId } = await params;

  const data = await trpcServerClient.agents.getOne.query({
    id: agentId,
  });

  return (
    <ErrorBoundary fallback={<ShowError title={'Agent loading error'} />}>
      <Suspense fallback={<Loader />}>
        <AgentStoreProvider>
          <Agent data={data} />
        </AgentStoreProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
