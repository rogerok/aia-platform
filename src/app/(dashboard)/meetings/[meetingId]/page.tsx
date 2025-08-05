import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MeetingStoreProvider } from '@/_pages/meeting/store/meetingStore';
import { Meeting } from '@/_pages/meeting/ui/Meeting';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

interface PageProps {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async (props: PageProps) => {
  await handleIsNotAuth();
  const params = await props.params;

  const data = await trpcServerClient.meetings.getOne.query({
    id: params.meetingId,
  });

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallback={<ShowError title={'Meeting loading error'} />}>
        <MeetingStoreProvider>
          <Meeting data={data} />
        </MeetingStoreProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
