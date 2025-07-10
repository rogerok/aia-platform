import 'server-only';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { envs } from '@/lib/constants/envs';
import { AppRouter } from '@/trpc/server/routers/router';

export const trpcServerClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      fetch,
      url: `${envs.baseUrl}/api/trpc`,
    }),
  ],
});
