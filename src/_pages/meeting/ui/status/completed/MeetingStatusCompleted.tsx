import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { MeetingStatusTabsList } from '@/_pages/meeting/ui/status/completed/MeetingStatusTabsList';
import { MeetingTabsContent } from '@/_pages/meeting/ui/status/completed/MeetingTabsContent';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs } from '@/components/ui/tabs';

export const MeetingStatusCompleted: FC = observer(() => {
  const { meeting } = useMeetingStore();

  return (
    meeting && (
      <div className={'flex flex-col gap-y-4'}>
        <Tabs defaultValue={'summary'}>
          <div className={'rounded-lg border bg-white px-3'}>
            <ScrollArea>
              <MeetingStatusTabsList />
              <ScrollBar orientation={'horizontal'} />
            </ScrollArea>
          </div>
          <MeetingTabsContent />
        </Tabs>
      </div>
    )
  );
});
