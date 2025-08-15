import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MeetingStatusCompleted: FC = observer(() => {
  const { meeting } = useMeetingStore();

  return (
    meeting && (
      <div className={'flex flex-col gap-y-4'}>
        <Tabs defaultValue={'summary'}>
          <div className={'rounded-lg border bg-white px-3'}>
            <ScrollArea>
              <TabsList
                className={'bg-background h-13 justify-start rounded-none p-0'}
              >
                <TabsTrigger
                  className={
                    'text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
                  }
                  value={'summary'}
                >
                  <BookOpenTextIcon />
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  className={
                    'text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
                  }
                  value={'transcript'}
                >
                  <FileTextIcon />
                  Transcript
                </TabsTrigger>
                <TabsTrigger
                  className={
                    'text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
                  }
                  value={'recording'}
                >
                  <FileVideoIcon />
                  Recording
                </TabsTrigger>
                <TabsTrigger
                  className={
                    'text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
                  }
                  value={'chat'}
                >
                  <SparklesIcon />
                  Ask AI
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation={'horizontal'} />
            </ScrollArea>
          </div>
          <TabsContent value={'recording'}>
            <div className={'rounded-lg border bg-white px-4 py-5'}>
              {meeting.recordingUrl && (
                <video
                  className={'w-full rounded-lg'}
                  controls
                  src={meeting.recordingUrl}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  );
});
