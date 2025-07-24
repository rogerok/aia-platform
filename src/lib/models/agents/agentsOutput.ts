import { inferRouterOutputs } from '@trpc/server';

import { agentsRouter } from '@/trpc/server/routers/agents';

export type AgentsGetManyRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getMany'];

export type AgentGetOneRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getOne'];
