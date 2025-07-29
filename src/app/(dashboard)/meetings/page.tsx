import { Meetings } from '@/_pages/meetings/ui/Meetings';
import { trpcServerClient } from '@/trpc/client/trpcServerClient';

const Page = async () => {
  const data = await trpcServerClient.meetings.getMany.query({
    page: 1,
    pageSize: 10,
    search: '',
  });

  return <Meetings data={data} />;
};

export default Page;
