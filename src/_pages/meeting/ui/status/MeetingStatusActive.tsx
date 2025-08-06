import { VideoIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { MeetingStatusIndicator } from '@/_pages/meeting/ui/status/MeetingStatusIndicator';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants/routes';

export const MeetingStatusActive: FC = observer(() => {
  const { meeting } = useMeetingStore();

  return (
    meeting && (
      <div>
        <MeetingStatusIndicator
          description={'Meeting will end once all participants have left'}
          iconPath={'/upcoming.svg'}
          title={'Meeting is active'}
        />
        <div
          className={
            'flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center'
          }
        >
          <Button
            // disabled={cancelling}
            asChild
            className={'w-full lg:w-auto'}
          >
            <Link href={routes.call(meeting.id)}>
              <VideoIcon />
              Join meeting
            </Link>
          </Button>
        </div>
      </div>
    )
  );
});
