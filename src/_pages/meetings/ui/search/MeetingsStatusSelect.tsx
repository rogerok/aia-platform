import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { statusIconMap } from '@/_pages/meetings/lib/constants';
import { CommandSelect } from '@/components/form/fields/Select/CommandSelect';
import { meetingStatusList } from '@/db/schemas/schema';

export const MeetingsStatusSelect: FC = observer(() => {
  return (
    <CommandSelect
      name={'status'}
      options={meetingStatusList.map((status) => ({
        children: (
          <div className={'flex items-center gap-x-2 capitalize'}>
            <span>{status}</span>
            {statusIconMap[status]}
          </div>
        ),
        id: status,
        value: status,
      }))}
      placeholder={'Select a status'}
    />
  );
});
