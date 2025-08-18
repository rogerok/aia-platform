import { format } from 'date-fns';
import { ClockFadingIcon, SparklesIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Markdown from 'react-markdown';

import { MeetingStatusTabsValues } from '@/_pages/meeting/constants/constants';
import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { LinkComponent } from '@/components/custom/LinkComponent/LinkComponent';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { routes } from '@/lib/constants/routes';
import { formatDuration } from '@/lib/utils/common';

export const MeetingTabsContent: FC = observer(() => {
  const { meeting } = useMeetingStore();

  return (
    meeting && (
      <>
        <TabsContent value={MeetingStatusTabsValues.recording}>
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
        <TabsContent value={MeetingStatusTabsValues.summary}>
          <div className={'rounded-lg border bg-white px-4 py-5'}>
            <div className={'col-span-5 flex flex-col gap-y-5 px-4 py-5'}>
              <h2 className={'text-2xl font-medium capitalize'}>
                {meeting.name}
              </h2>
              <div className={'flex items-center gap-x-2'}>
                <LinkComponent
                  className={'flex items-center gap-x-2 capitalize'}
                  href={routes.agent(meeting.agentId)}
                >
                  <GeneratedAvatar
                    className={'no-underline'}
                    firstName={meeting.agent.name}
                  />
                  <span className={'underline underline-offset-4'}>
                    {meeting.agent.name}
                  </span>
                </LinkComponent>
                {meeting.startedAt && (
                  <p> {format(meeting.startedAt, 'PPP')}</p>
                )}
              </div>
              <div className={'flex flex-col gap-x-2 gap-y-2'}>
                <p className={'flex items-center gap-x-2'}>
                  <SparklesIcon className={'size-4'} />
                  <span>General summary</span>
                </p>

                <Badge
                  className={'flex items-center gap-x-2 [&>svg]:size-4'}
                  variant={'outline'}
                >
                  <ClockFadingIcon className={'text-blue-700'} />
                  {meeting.duration
                    ? formatDuration(meeting.duration)
                    : 'No duration'}
                </Badge>
                <div>
                  <Markdown
                    components={{
                      h1: (props) => (
                        <h1
                          className={'mb-6 text-2xl font-medium capitalize'}
                          {...props}
                        />
                      ),
                      h2: (props) => (
                        <h2
                          className={'mb-6 text-xl font-medium capitalize'}
                          {...props}
                        />
                      ),
                      h3: (props) => (
                        <h1
                          className={'mb-6 text-lg font-medium capitalize'}
                          {...props}
                        />
                      ),
                      h4: (props) => (
                        <h1
                          className={'mb-6 text-base font-medium capitalize'}
                          {...props}
                        />
                      ),
                      li: (props) => <li className={'mb-1'} {...props} />,
                      ol: (props) => (
                        <ol
                          className={'mb-6 list-inside list-decimal'}
                          {...props}
                        />
                      ),
                      p: (props) => (
                        <p className={'mb-6 leading-relaxed'} {...props} />
                      ),
                      ul: (props) => (
                        <ul
                          className={'mb-6 list-inside list-decimal'}
                          {...props}
                        />
                      ),
                    }}
                  >
                    {meeting.summary ? meeting.summary : 'No summary'}
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value={MeetingStatusTabsValues.transcript}>
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
        <TabsContent value={MeetingStatusTabsValues.chat}>
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
      </>
    )
  );
});
