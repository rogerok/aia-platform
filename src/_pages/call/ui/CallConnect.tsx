'use client';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

import { useCallStore } from '@/_pages/call/store/callStore';
import { RenderCall } from '@/_pages/call/ui/RenderCall';
import { Loader } from '@/components/custom/Loader/Loader';
import { envs } from '@/lib/constants/envs';
import { trpcClient } from '@/trpc/client/trpcClient';

interface CallConnectProps {
  userId: string;
  userName: string;
}

export const CallConnect: FC<CallConnectProps> = observer((props) => {
  const {
    call,
    endCall,
    endStreamVideo,
    initStreamVideoClient,
    makeCall,
    streamVideoClient,
  } = useCallStore();
  const { userId, userName } = props;

  useEffect(() => {
    initStreamVideoClient(
      new StreamVideoClient({
        apiKey: envs.streamVideoApiKey,
        tokenProvider: trpcClient.meetings.generateToken.mutate,
        user: {
          id: userId,
          name: userName,
        },
      }),
    );

    return () => {
      endStreamVideo();
    };
  }, [endStreamVideo, initStreamVideoClient, userId, userName]);

  useEffect(() => {
    makeCall();

    return () => {
      endCall();
    };
  }, [endCall, makeCall, streamVideoClient]);

  if (!(call && streamVideoClient)) {
    return <Loader />;
  }

  return (
    <StreamVideo client={streamVideoClient}>
      <StreamCall call={call}>
        <RenderCall />
      </StreamCall>
    </StreamVideo>
  );
});
