import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AgentsStoreProvider } from '@/_pages/agents/store/AgentsStore';
import { Agents } from '@/_pages/agents/ui/Agents';
import { AgentsHeader } from '@/_pages/agents/ui/AgentsHeader';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const AgentsData = async () => {
  const data = await trpcServerClient.agents.getMany.query();

  return <Agents data={data} />;
};

const Page = async () => {
  await handleIsNotAuth();

  return (
    <ErrorBoundary fallback={<ShowError title={'Agents loading error'} />}>
      <Suspense fallback={<Loader />}>
        <AgentsStoreProvider>
          <AgentsHeader />
          <AgentsData />
        </AgentsStoreProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
