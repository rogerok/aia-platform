import { FC } from 'react';

import { TabsStatusType } from '@/_pages/meeting/constants/constants';
import { TabsTrigger } from '@/components/ui/tabs';

interface MeetingStatusTabItem {
  tab: TabsStatusType;
}

export const MeetingStatusTabItem: FC<MeetingStatusTabItem> = (props) => {
  const { tab } = props;

  return (
    <TabsTrigger
      className={
        'text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
      }
      value={tab.id}
    >
      {tab.label}
    </TabsTrigger>
  );
};
