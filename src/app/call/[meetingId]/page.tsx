import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CallStoreContext } from '@/_pages/call/store/callStore';
import { Call } from '@/_pages/call/ui/Call';
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
  const { params } = props;

  const { meetingId } = await params;

  await handleIsNotAuth();

  const meeting = await trpcServerClient.meetings.getOne.query({
    id: meetingId,
  });

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallback={<ShowError />}>
        <CallStoreContext>
          <Call data={meeting} />
        </CallStoreContext>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
