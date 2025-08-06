import { BanIcon, VideoIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { MeetingStatusIndicator } from '@/_pages/meeting/ui/status/MeetingStatusIndicator';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants/routes';

export const MeetingStatusUpcoming: FC = observer(() => {
  const { meeting } = useMeetingStore();

  return (
    meeting && (
      <div>
        <MeetingStatusIndicator
          description={
            'Once you start this meeting, a summary will appear here'
          }
          iconPath={'/upcoming.svg'}
          title={'Not started yet'}
        />
        <div
          className={
            'flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center'
          }
        >
          <Button
            // disabled={cancelling}
            // onClick={onCancelMeeting}
            className={'w-full lg:w-auto'}
            variant={'secondary'}
          >
            <BanIcon />
            Cancel meeting
          </Button>
          <Button
            // disabled={cancelling}
            asChild
            className={'w-full lg:w-auto'}
          >
            <Link href={routes.call(meeting.id)}>
              <VideoIcon />
              Start meeting
            </Link>
          </Button>
        </div>
      </div>
    )
  );
});
