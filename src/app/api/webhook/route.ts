import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from '@stream-io/node-sdk';
import { NextRequest, NextResponse } from 'next/server';

import {
  handleCallEndedEvent,
  handleCallRecordingReadyEvent,
  handleCallSessionParticipantLeftEvent,
  handleCallSessionStartedEvent,
  handleCallTranscriptionReadyEvent,
} from '@/app/api/webhook/handlers';
import { streamVideoService } from '@/lib/streamVideo';
import { create400Response, createErrorResponse } from '@/lib/utils/responses';

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideoService.verifyWebHook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-signature');
  const apiKey = req.headers.get('x-api-key');

  if (!signature || !apiKey) {
    return create400Response('Missing signature or API key');
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return createErrorResponse('Invalid signature', 401);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return create400Response('Invalid JSON');
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  switch (eventType) {
    case 'call.session_started':
      await handleCallSessionStartedEvent(payload as CallSessionStartedEvent);
      break;

    case 'call.session_participant_left':
      await handleCallSessionParticipantLeftEvent(
        payload as CallSessionParticipantLeftEvent,
      );
      break;

    case 'call.session_ended':
      await handleCallEndedEvent(payload as CallEndedEvent);
      break;

    case 'call.transcription_ready':
      await handleCallTranscriptionReadyEvent(
        payload as CallTranscriptionReadyEvent,
      );
      break;

    case 'call.recording_ready':
      await handleCallRecordingReadyEvent(payload as CallRecordingReadyEvent);
      break;
  }

  return NextResponse.json({ status: 'ok' });
}
