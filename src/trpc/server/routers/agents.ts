import { inferRouterOutputs } from '@trpc/server';

import { db } from '@/db';
import { agents } from '@/db/schemas/schema';
import { baseProcedure, createTRPCRouter } from '@/trpc/server/init';

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
});

type RouterOutput = inferRouterOutputs<typeof agentsRouter>['getMany'][number];
