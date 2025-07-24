import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';

import { db } from '@/db';
import { agents } from '@/db/schemas/schema';
import {
  AgentCreateModel,
  AgentDeleteModel,
  AgentGetModel,
  AgentsQueryModel,
  AgentUpdateModel,
} from '@/lib/models/agents/agents';
import { createTRPCRouter, protectedProcedure } from '@/trpc/server/init';
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
  delete: protectedProcedure
    .input((input) => processInput(AgentDeleteModel, input))
    .mutation(async ({ ctx, input }) => {
      return db
        .delete(agents)
        .where(
          and(eq(agents.userId, ctx.auth.user.id), eq(agents.id, input.id)),
        );
    }),

  getMany: protectedProcedure
    .input((input) => processInput(AgentsQueryModel, input))
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const data = await db
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        );

      const totalPages = Math.ceil(total[0].count / pageSize);

      return {
        items: data,
        total: total[0].count,
        totalPages: totalPages,
      };
    }),

  getOne: protectedProcedure
    .input((input) => processInput(AgentGetModel, input))
    .query(async ({ ctx, input }) => {
      const [agent] = await db
        .select({
          // TODO: add real value
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)),
        );
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }
      return agent;
    }),

  update: protectedProcedure
    .input((input) => processInput(AgentUpdateModel, input))
    .mutation(async ({ ctx, input }) => {
      const { id, instructions, name } = input;
      const [updatedAgent] = await db
        .update(agents)
        .set({
          instructions: instructions,
          name: name,
        })
        .where(and(eq(agents.id, id), eq(agents.userId, ctx.auth.user.id)))
        .returning();
    }),
});
