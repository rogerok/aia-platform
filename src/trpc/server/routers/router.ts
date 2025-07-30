import { createTRPCRouter } from '@/trpc/server/init';
import { agentsRouter } from '@/trpc/server/routers/agents';
import { meetingsRouter } from '@/trpc/server/routers/meetings';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});

export type AppRouter = typeof appRouter;
