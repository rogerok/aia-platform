import { inferRouterOutputs } from '@trpc/server';

import { db } from '@/db';
import { agents } from '@/db/schemas/schema';
import { AgentCreateModel } from '@/lib/models/agents';
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/server/init';
import { processInput } from '@/trpc/server/validator';

export const agentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input((input) => processInput(AgentCreateModel, input))
    .mutation(async ({ ctx, input }) => {
      const { instructions, name } = input;

      const [createdAgent] = await db
        .insert(agents)
        .values({
          instructions,
          name,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
  getMany: baseProcedure.query(async () => db.select().from(agents)),
});

export type AgentRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getMany'][number];
