import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useCallStore } from '@/_pages/call/store/callStore';
import { LinkComponent } from '@/components/custom/LinkComponent/LinkComponent';
import { Logo } from '@/components/custom/Logo/Logo';

export const CallActive: FC = observer(() => {
  const { handleLeave, meeting } = useCallStore();

  return (
    <div
      className={
        'text-muted-foreground flex h-full flex-col justify-between p-4'
      }
    >
      <div className={'flex items-center gap-4 rounded-full bg-[#101213] p-4'}>
        <LinkComponent
          className={
            'flex w-fit items-center justify-center rounded-full bg-white/10 p-1'
          }
          href={'/'}
        >
          <Logo height={22} width={22} />
        </LinkComponent>
        <h4 className={'text-base'}>{meeting.name}</h4>
      </div>
      <SpeakerLayout />
      <div className={'rounded-full bg-[#101213] px-4'}>
        <CallControls onLeave={handleLeave} />
      </div>
    </div>
  );
});
