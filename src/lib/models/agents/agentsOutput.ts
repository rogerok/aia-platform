import { inferRouterOutputs } from '@trpc/server';

import { agentsRouter } from '@/trpc/server/routers/agents';

export type AgentRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getMany'];
