import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from '@stream-io/node-sdk';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { agents, meetings } from '@/db/schemas/schema';
import { inngest } from '@/inngest/client';
import { MeetingStatusConstant } from '@/lib/models/meetings/meetings';
import { streamVideoService } from '@/lib/streamVideo';
import { create400Response, create404Response } from '@/lib/utils/responses';

const missingMeetingIdResponse = create400Response('Missing meeting id');
const meetingNotFoundResponse = create404Response('Meeting not found');

export const handleCallSessionStartedEvent = async (
  event: CallSessionStartedEvent,
) => {
  const meetingId = event.call.custom?.meetingId;

  if (!meetingId) {
    return missingMeetingIdResponse;
  }

  const [existingMeeting] = await db
    .select()
    .from(meetings)
    .where(
      and(
        eq(meetings.id, meetingId),
        eq(meetings.status, MeetingStatusConstant.upcoming),
      ),
    );

  if (!existingMeeting) {
    return meetingNotFoundResponse;
  }

  await db
    .update(meetings)
    .set({
      startedAt: new Date(),
      status: MeetingStatusConstant.active,
    })
    .where(eq(meetings.id, meetingId));

  const [existingAgent] = await db
    .select()
    .from(agents)
    .where(eq(agents.id, existingMeeting.agentId));

  if (!existingAgent) {
    return create404Response('Agent not found');
  }

  const realtimeClient = await streamVideoService.connectOpenAi(
    existingAgent.id,
    meetingId,
  );

  realtimeClient.updateSession({
    instructions: existingAgent.instructions,
  });
};

export const handleCallSessionParticipantLeftEvent = async (
  event: CallSessionParticipantLeftEvent,
) => {
  const meetingId = event.call_cid.split(':')[1];

  if (!meetingId) {
    return missingMeetingIdResponse;
  }

  await streamVideoService.endCall(meetingId);
};

export const handleCallEndedEvent = async (event: CallEndedEvent) => {
  const meetingId = event.call.custom?.meetingId;

  if (!meetingId) {
    return missingMeetingIdResponse;
  }

  await db
    .update(meetings)
    .set({
      endedAt: new Date(),
      status: MeetingStatusConstant.processing,
    })
    .where(
      and(
        eq(meetings.id, meetingId),
        eq(meetings.status, MeetingStatusConstant.active),
      ),
    );
};

export const handleCallTranscriptionReadyEvent = async (
  event: CallTranscriptionReadyEvent,
) => {
  const meetingId = event.call_cid.split(':')[1];

  const [updatedMeeting] = await db
    .update(meetings)
    .set({
      transcriptUrl: event.call_transcription.url,
    })
    .where(and(eq(meetings.id, meetingId)))
    .returning();

  if (!updatedMeeting) {
    return meetingNotFoundResponse;
  }

  await inngest.send({
    data: {
      meetingId: updatedMeeting.id,
      transcriptUrl: updatedMeeting.transcriptUrl,
    },
    name: 'meetings/processing',
  });
};

export const handleCallRecordingReadyEvent = async (
  event: CallRecordingReadyEvent,
) => {
  const meetingId = event.call_cid.split(':')[1];

  await db
    .update(meetings)
    .set({
      recordingUrl: event.call_recording.url,
    })
    .where(and(eq(meetings.id, meetingId)));
};
