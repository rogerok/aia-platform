import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, ilike } from 'drizzle-orm';

import { db } from '@/db';
import { meetings } from '@/db/schemas/schema';
import {
  MeetingCreateModel,
  MeetingEditModel,
  MeetingGetModel,
  MeetingsQueryModel,
} from '@/lib/models/meetings/meetings';
import { createTRPCRouter, protectedProcedure } from '@/trpc/server/init';
import { processInput } from '@/trpc/server/validator';

export const meetingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input((input) => processInput(MeetingCreateModel, input))
    .mutation(async ({ ctx, input }) => {
      const { agentId, name } = input;
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          agentId: agentId,
          name: name,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdMeeting;
    }),
  getMany: protectedProcedure
    .input((input) => processInput(MeetingsQueryModel, input))
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const data = await db
        .select()
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
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
    .input((input) => processInput(MeetingGetModel, input))
    .query(async ({ ctx, input }) => {
      const [meeting] = await db
        .select()
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        );
      if (!meeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }
      return meeting;
    }),

  update: protectedProcedure
    .input((input) => processInput(MeetingEditModel, input))
    .mutation(async ({ ctx, input }) => {
      const { agentId, id, name } = input;
      const [updatedMeeting] = await db
        .update(meetings)
        .set({
          agentId: agentId,
          name: name,
        })
        .where(and(eq(meetings.id, id), eq(meetings.userId, ctx.auth.user.id)))
        .returning();

      if (!updatedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return updatedMeeting;
    }),
});
