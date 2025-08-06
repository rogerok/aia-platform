import { FC } from 'react';

import { MeetingStatusIndicator } from '@/_pages/meeting/ui/status/MeetingStatusIndicator';

export const MeetingStatusCancelled: FC = () => {
  return (
    <MeetingStatusIndicator
      description={'This meeting was cancelled'}
      iconPath={'/canceled.svg'}
      title={'Meeting canceled'}
    />
  );
};
