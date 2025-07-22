import 'server-only';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { headers } from 'next/headers';

import { envs } from '@/lib/constants/envs';
import { AppRouter } from '@/trpc/server/routers/router';

export const trpcServerClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      fetch: async (url, options) => {
        const hdrs = Object.fromEntries(await headers());

        return fetch(url, {
          ...options,
          headers: {
            ...hdrs,
            ...options?.headers,
          },
        });
      },
      url: `${envs.baseUrl}/api/trpc`,
    }),
  ],
});
