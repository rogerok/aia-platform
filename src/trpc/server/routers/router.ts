import { createTRPCRouter } from '@/trpc/server/init';
import { agentsRouter } from '@/trpc/server/routers/agents';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
