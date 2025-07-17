import { inferRouterOutputs } from '@trpc/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { agents } from '@/db/schemas/schema';
import { AgentCreateModel, AgentGetModel } from '@/lib/models/agents';
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
  getMany: baseProcedure.query(async () => {
    return db.select().from(agents);
  }),

  getOne: protectedProcedure
    .input((input) => processInput(AgentGetModel, input))
    .query(async ({ input }) => {
      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return agent;
    }),
});

export type AgentRouterOutput = inferRouterOutputs<
  typeof agentsRouter
>['getOne'];
