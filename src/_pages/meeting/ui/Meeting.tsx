'use client';

import { plainToInstance } from 'class-transformer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingStoreHydration } from '@/_pages/meeting/store/meetingStore';
import { MeetingActionsDropdown } from '@/_pages/meeting/ui/MeetingActionsDropdown';
import { MeetingBreadcrumbs } from '@/_pages/meeting/ui/MeetingBreadcrubms';
import { MeetingEditForm } from '@/_pages/meeting/ui/MeetingEditForm';
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog/ConfirmationDialog';
import { MeetingModel } from '@/lib/models/meetings/meetings';
import { MeetingsGetOneRouterOutput } from '@/lib/models/meetings/meetingsOutput';

interface MeetingProps {
  data: MeetingsGetOneRouterOutput;
}

export const Meeting: FC<MeetingProps> = observer((props) => {
  const store = useMeetingStoreHydration((store) =>
    store.hydrate(plainToInstance(MeetingModel, props.data)),
  );

  return (
    store.meeting && (
      <>
        <div
          className={'bg-muted flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'}
        >
          <div className={'flex items-center justify-between'}>
            <MeetingBreadcrumbs />
            <MeetingActionsDropdown />
          </div>
          <ConfirmationDialog
            cancelCb={store.deleteDialog.setFalse}
            confirmCb={store.delete}
            onOpenChange={store.deleteDialog.setValue}
            open={store.deleteDialog.value}
            title={`Do you want to delete ${store.meeting.name} meeting?`}
          />
          <MeetingEditForm />
        </div>
      </>
    )
  );
});
