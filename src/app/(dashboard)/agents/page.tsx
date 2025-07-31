import { plainToInstance } from 'class-transformer';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AgentsStoreProvider } from '@/_pages/agents/store/agentsStore';
import { Agents } from '@/_pages/agents/ui/Agents';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { AgentsQueryModel } from '@/lib/models/agents/agents';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

interface AgentsDataProps {
  searchParams: AgentsQueryModel;
}

const AgentsData = async (props: AgentsDataProps) => {
  const data = await trpcServerClient.agents.getMany.query(props.searchParams);

  return <Agents data={data} />;
};

interface PageProps {
  searchParams: Promise<AgentsQueryModel>;
}

const Page = async ({ searchParams }: PageProps) => {
  await handleIsNotAuth();
  const params = await searchParams;

  const filters = plainToInstance(AgentsQueryModel, params, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });

  return (
    <ErrorBoundary fallback={<ShowError title={'Agents loading error'} />}>
      <Suspense fallback={<Loader />}>
        <AgentsStoreProvider>
          <AgentsData searchParams={filters} />
        </AgentsStoreProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
