import 'server-only';

import type { UserRequest } from '@stream-io/node-sdk';

import { StreamClient } from '@stream-io/node-sdk';

import { envs } from '@/lib/constants/envs';
import { errorHandle } from '@/lib/decorators/errorHandle';

const client = new StreamClient(
  envs.streamVideoApiKey,
  envs.streamVideoSecretKey,
);

export class StreamVideoService {
  streamClient: StreamClient;

  constructor(streamClient: StreamClient) {
    this.streamClient = streamClient;
  }

  async connectOpenAi(agentId: string, meetingId: string) {
    return await this.streamClient.video.connectOpenAi({
      agentUserId: agentId,
      call: this.makeCall(meetingId),
      openAiApiKey: envs.openAiKey,
    });
  }

  async createCall(userId: string, meetingId: string, meetingName: string) {
    return await this.streamClient.video.call('default', meetingId).create({
      data: {
        created_by_id: userId,
        custom: {
          meetingId: meetingId,
          meetingName: meetingName,
        },
        settings_override: {
          recording: {
            mode: 'auto-on',
            quality: '1080p',
          },
          transcription: {
            closed_caption_mode: 'auto-on',
            language: 'auto',
            mode: 'auto-on',
          },
        },
      },
    });
  }

  async endCall(meetingId: string) {
    await this.makeCall(meetingId).end();
  }

  generateToken(userId: string) {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    return this.streamClient.generateUserToken({
      exp: expirationTime,
      user_id: userId,
      validity_in_seconds: issuedAt,
    });
  }

  makeCall(meetingId: string) {
    return this.streamClient.video.call('default', meetingId);
  }

  @errorHandle('User was not created')
  async upsertUsers(users: UserRequest[]) {
    return await this.streamClient.upsertUsers(users);
  }

  verifyWebHook(body: string, signature: string) {
    return this.streamClient.verifyWebhook(body, signature);
  }
}

export const streamVideoService = new StreamVideoService(client);
