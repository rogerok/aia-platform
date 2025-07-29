import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Meetings } from '@/_pages/meetings/ui/Meetings';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const Page = async () => {
  const data = await trpcServerClient.meetings.getMany.query({
    page: 1,
    pageSize: 10,
    search: '',
  });

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<ShowError title={'Meetings list loading error'} />}
      >
        <Meetings data={data} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
