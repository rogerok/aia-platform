import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MeetingsStoreProvider } from '@/_pages/meetings/store/meetingsStore';
import { Meetings } from '@/_pages/meetings/ui/Meetings';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const Page = async () => {
  await handleIsNotAuth();

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
        <MeetingsStoreProvider>
          <Meetings data={data} />
        </MeetingsStoreProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
