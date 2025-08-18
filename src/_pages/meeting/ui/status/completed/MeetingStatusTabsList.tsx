'use client';

import { FC } from 'react';

import {
  MeetingStatusTabsValues,
  StatusTabsConstant,
} from '@/_pages/meeting/constants/constants';
import { MeetingStatusTabItem } from '@/_pages/meeting/ui/status/completed/MeetingStatusTabItem';
import { TabsList } from '@/components/ui/tabs';

export const MeetingStatusTabsList: FC = () => {
  return (
    <TabsList
      className={'bg-background h-13 justify-start rounded-none p-0'}
      defaultValue={MeetingStatusTabsValues.summary}
    >
      {StatusTabsConstant.map((tab) => (
        <MeetingStatusTabItem key={tab.id} tab={tab} />
      ))}
    </TabsList>
  );
};
