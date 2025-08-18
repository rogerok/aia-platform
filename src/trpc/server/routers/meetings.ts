import { TRPCError } from '@trpc/server';
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  inArray,
  sql,
} from 'drizzle-orm';
import JSONL from 'jsonl-parse-stringify';

import { db } from '@/db';
import { agents, meetings, user } from '@/db/schemas/schema';
import {
  MeetingCreateModel,
  MeetingDeleteModel,
  MeetingEditModel,
  MeetingGetModel,
  MeetingsQueryModel,
} from '@/lib/models/meetings/meetings';
import { StreamTranscriptItem } from '@/lib/models/meetings/stream';
import { streamVideoService } from '@/lib/streamVideo';
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

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, createdMeeting.agentId));

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      await streamVideoService.createCall(
        ctx.auth.user.id,
        createdMeeting.id,
        createdMeeting.name,
      );

      await streamVideoService.upsertUsers([
        {
          id: existingAgent.id,
          name: existingAgent.name,
          role: 'user',
        },
      ]);

      return createdMeeting;
    }),

  delete: protectedProcedure
    .input((input) => processInput(MeetingDeleteModel, input))
    .mutation(async ({ ctx, input }) => {
      const [updatedMeeting] = await db
        .delete(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!updatedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return updatedMeeting;
    }),

  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideoService.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name,
        role: 'admin',
      },
    ]);

    return streamVideoService.generateToken(ctx.auth.user.id);
  }),
  getMany: protectedProcedure
    .input((input) => processInput(MeetingsQueryModel, input))
    .query(async ({ ctx, input }) => {
      const { agentId, page, pageSize, search, status } = input;

      const data = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM(ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
            status ? eq(meetings.status, status) : undefined,
            agentId ? eq(meetings.agentId, agentId) : undefined,
          ),
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
            status ? eq(meetings.status, status) : undefined,
            agentId ? eq(meetings.agentId, agentId) : undefined,
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
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM(ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
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

  getTranscript: protectedProcedure
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

      if (!meeting.transcriptUrl) {
        return [];
      }

      const transcript = await fetch(meeting.transcriptUrl)
        .then((res) => res.text())
        .then((text) => JSONL.parse<StreamTranscriptItem>(text))
        .catch(() => {
          return [];
        });

      const speakersIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakersIds));

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakersIds));

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id,
        );

        return {
          speakerId: item.speaker_id,
          startTs: item.start_ts,
          stopTs: item.stop_ts,
          text: item.text,
          type: item.type,
          user: {
            name: speaker?.name ?? 'Unknown',
          },
        };
      });
    }),
  update: protectedProcedure
    .input((input) => processInput(MeetingEditModel, input))
    .mutation(async ({ ctx, input }) => {
      const { agentId, id, name } = input;

      const [updated] = await db
        .update(meetings)
        .set({ agentId, name })
        .where(and(eq(meetings.id, id), eq(meetings.userId, ctx.auth.user.id)))
        .returning({ id: meetings.id });

      if (!updated) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      const [meeting] = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM(ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.id, updated.id),
            eq(meetings.userId, ctx.auth.user.id),
          ),
        );

      return meeting;
    }),
});
