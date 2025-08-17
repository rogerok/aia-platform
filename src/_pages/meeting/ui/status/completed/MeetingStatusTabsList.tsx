'use client';

import { FC, useState } from 'react';

import { StatusTabsConstant } from '@/_pages/meeting/constants/constants';
import { MeetingStatusTabItem } from '@/_pages/meeting/ui/status/completed/MeetingStatusTabItem';
import { TabsList } from '@/components/ui/tabs';
import { createTabManager } from '@/lib/stores/tabsManager';

export const MeetingStatusTabsList: FC = () => {
  const [tabsManager] = useState(() =>
    createTabManager({
      abortSignal: new AbortController().signal,
      tabs: StatusTabsConstant,
    }),
  );

  return (
    <TabsList className={'bg-background h-13 justify-start rounded-none p-0'}>
      {tabsManager.tabs.map((tab) => (
        <MeetingStatusTabItem key={tab.id} tab={tab} />
      ))}
    </TabsList>
  );
};
