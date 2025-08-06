import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMeetingStore } from '@/_pages/meeting/store/meetingStore';
import { MeetingStatusActive } from '@/_pages/meeting/ui/status/MeetingStatusActive';
import { MeetingStatusCancelled } from '@/_pages/meeting/ui/status/MeetingStatusCancelled';
import { MeetingStatusProcessing } from '@/_pages/meeting/ui/status/MeetingStatusProcessing';
import { MeetingStatusUpcoming } from '@/_pages/meeting/ui/status/MeetingStatusUpcoming';
import { MeetingStatusConstant } from '@/lib/models/meetings/meetings';

export const RenderStatus: FC = observer(() => {
  const { meeting } = useMeetingStore();

  switch (meeting?.status) {
    case MeetingStatusConstant.active:
      return <MeetingStatusActive />;

    case MeetingStatusConstant.upcoming:
      return <MeetingStatusUpcoming />;

    case MeetingStatusConstant.cancelled:
      return <MeetingStatusCancelled />;

    case MeetingStatusConstant.processing:
      return <MeetingStatusProcessing />;

    default:
      return null;
  }
});
