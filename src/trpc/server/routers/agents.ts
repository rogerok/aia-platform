import { inferRouterOutputs } from '@trpc/server';

import { db } from '@/db';
import { agents } from '@/db/schemas/schema';
import { baseProcedure, createTRPCRouter } from '@/trpc/server/init';

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => db.select().from(agents)),
});

export type AgentRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getMany'][number];
