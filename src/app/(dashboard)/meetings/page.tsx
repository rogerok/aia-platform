import { plainToInstance } from 'class-transformer';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MeetingsStoreProvider } from '@/_pages/meetings/store/meetingsStore';
import { Meetings } from '@/_pages/meetings/ui/Meetings';
import { ShowError } from '@/components/custom/Error/ShowError';
import { Loader } from '@/components/custom/Loader/Loader';
import { handleIsNotAuth } from '@/lib/authActions';
import { MeetingsQueryModel } from '@/lib/models/meetings/meetings';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

interface MeetingsDataProps {
  searchParams: MeetingsQueryModel;
}

const MeetingsData = async (props: MeetingsDataProps) => {
  const { searchParams } = props;

  const data = await trpcServerClient.meetings.getMany.query(searchParams);

  return <Meetings data={data} />;
};

interface PageProps {
  searchParams: Promise<MeetingsQueryModel>;
}

const Page = async ({ searchParams }: PageProps) => {
  await handleIsNotAuth();
  const params = await searchParams;

  const filters = plainToInstance(MeetingsQueryModel, params, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<ShowError title={'Meetings list loading error'} />}
      >
        <MeetingsStoreProvider>
          <MeetingsData searchParams={filters} />
        </MeetingsStoreProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
