import { format } from 'date-fns';
import { FC, useEffect } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MeetingTranscript: FC = () => {
  const { fetchTranscript, transcript } = useMeetingStore();

  useEffect(() => {
    void fetchTranscript();
  }, [fetchTranscript]);

  return (
    <div>
      <ScrollArea>
        {transcript.map((item) => {
          return (
            <div
              className={
                'hover:bg-muted flex flex-col gap-y-2 rounded-md border p-4'
              }
              key={item.startTs}
            >
              <div className={'flex items-center gap-x-2'}>
                <p className={'text-sm font-medium'}>{item.user.name}</p>
                <p className={'text-sm font-medium text-blue-500'}>
                  {format(new Date(0, 0, 0, 0, 0, 0, item.startTs), 'mm:ss')}
                </p>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};
