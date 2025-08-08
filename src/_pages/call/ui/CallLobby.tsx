import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import { LogInIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { FC } from 'react';

import { useCallStore } from '@/_pages/call/store/callStore';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants/routes';
import { useRootStore } from '@/lib/stores/rootStore';

const AllowBrowserPermission: FC = () => {
  return (
    <p className={'text-sm'}>
      Please grant your browser a permission to access your camera and
      microphone
    </p>
  );
};

const DisabledVideoPreview: FC = observer(() => {
  const session = useRootStore().authStore.getSession();

  return (
    session && (
      <DefaultVideoPlaceholder
        participant={
          {
            name: session.user.name,
            userId: session.user.id,
          } as StreamVideoParticipant
        }
      />
    )
  );
});

export const CallLobby: FC = observer(() => {
  const { authStore } = useRootStore();
  const { handleJoin } = useCallStore();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const { hasBrowserPermission: hasMicrophonePermission } =
    useMicrophoneState();

  const hasPermission = hasMicrophonePermission && hasCameraPermission;

  return (
    <div
      className={
        'text-foreground from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial'
      }
    >
      <div className={'flex flex-1 items-center justify-center px-8 py-4'}>
        <div
          className={
            'bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm'
          }
        >
          <div className={'flex flex-col gap-y-2 text-center'}>
            <h6 className={'text-lg font-medium'}>Ready to join?</h6>
            <p className={'text-sm'}>Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasPermission ? DisabledVideoPreview : AllowBrowserPermission
            }
          />
          <div className={'flex gap-x-2'}>
            <ToggleVideoPreviewButton />
            <ToggleAudioPreviewButton />
          </div>
          <div className={'flex w-full justify-between gap-x-2'}>
            <Button asChild variant={'ghost'}>
              <Link href={routes.meetings()}>Cancel</Link>
            </Button>
            <Button onClick={handleJoin}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
