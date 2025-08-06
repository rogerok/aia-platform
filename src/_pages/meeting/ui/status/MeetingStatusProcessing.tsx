import { FC } from 'react';

import { MeetingStatusIndicator } from '@/_pages/meeting/ui/status/MeetingStatusIndicator';

export const MeetingStatusProcessing: FC = () => {
  return (
    <MeetingStatusIndicator
      description={'This meeting was completed, a summary will appear soon'}
      iconPath={'/processing.svg'}
      title={'Meeting completed'}
    />
  );
};
