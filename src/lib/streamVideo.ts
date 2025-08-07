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

  async createCall(id: string, meetingId: string, meetingName: string) {
    return await this.streamClient.video.call('default', id).create({
      data: {
        created_by_id: id,
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

  generateToken(userId: string) {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    return this.streamClient.generateUserToken({
      exp: expirationTime,
      user_id: userId,
      validity_in_seconds: issuedAt,
    });
  }

  @errorHandle('User was not created')
  async upsertUsers(users: UserRequest[]) {
    return await this.streamClient.upsertUsers(users);
  }
}

export const streamVideoService = new StreamVideoService(client);
