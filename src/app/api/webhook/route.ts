import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from '@stream-io/node-sdk';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { agents, meetings } from '@/db/schemas/schema';
import { MeetingStatusConstant } from '@/lib/models/meetings/meetings';
import { streamVideoService } from '@/lib/streamVideo';

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideoService.verifyWebHook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-signature');
  const apiKey = req.headers.get('x-api-key');

  if (!signature || !apiKey) {
    return NextResponse.json(
      {
        error: 'Missing signature or API key',
      },
      { status: 400 },
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json(
      {
        error: 'Invalid signature',
      },
      { status: 401 },
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid JSON',
      },
      { status: 400 },
    );
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === 'call.session_started') {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting id' },
        { status: 400 },
      );
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
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
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
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const realtimeClient = await streamVideoService.connectOpenAi(
      existingAgent.id,
      meetingId,
    );

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === 'call.session_participant_left') {
    const event = payload as CallSessionParticipantLeftEvent;

    const meetingId = event.call_cid.split(':')[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting id' },
        { status: 400 },
      );
    }

    await streamVideoService.endCall(meetingId);
  }

  return NextResponse.json({ status: 'ok' });
}
