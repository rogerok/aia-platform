import 'client-only';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { AppRouter } from '@/trpc/server/routers/router';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: '/api/trpc' })],
});
