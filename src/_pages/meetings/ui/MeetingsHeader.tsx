'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingsStore } from '@/_pages/meetings/store/meetingsStore';
import { MeetingsDialog } from '@/_pages/meetings/ui/MeetingsDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MeetingsHeaderProps {
  className?: string;
}

export const MeetingsHeader: FC<MeetingsHeaderProps> = observer((props) => {
  const { dialog } = useMeetingsStore();

  return (
    <div
      className={cn(
        'p-x-4 md:p-x-8 flex w-full flex-col pt-4',
        props.className,
      )}
    >
      <div className={'flex w-full items-center justify-between'}>
        <h5 className={'text-xl' + ' font-medium'}>My meetings</h5>
        <Button onClick={dialog.setTrue}>New meeting</Button>
      </div>
      {/*<MeetingsSearchFilter />*/}
      <MeetingsDialog />
    </div>
  );
});
