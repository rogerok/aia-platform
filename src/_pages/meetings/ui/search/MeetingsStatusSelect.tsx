import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { statusIconMap } from '@/_pages/meetings/lib/constants';
import {
  CommandSelect,
  CommandSelectOptionType,
} from '@/components/form/fields/Select/CommandSelect';
import { meetingStatusList } from '@/db/schemas/schema';
import { MeetingStatusConstant } from '@/lib/models/meetings/meetings';

interface MeetingsStatusSelectProps {
  className?: string;
}

const options: CommandSelectOptionType[] = [
  {
    children: (
      <div className={'flex items-center gap-x-2 capitalize'}>
        {MeetingStatusConstant.active}
        {statusIconMap.active}
      </div>
    ),
    id: MeetingStatusConstant.active,
    value: MeetingStatusConstant.active,
  },
  {
    children: (
      <div className={'flex items-center gap-x-2 capitalize'}>
        {MeetingStatusConstant.upcoming}
        {statusIconMap.upcoming}
      </div>
    ),
    id: MeetingStatusConstant.upcoming,
    value: MeetingStatusConstant.upcoming,
  },
  {
    children: (
      <div className={'flex items-center gap-x-2 capitalize'}>
        {MeetingStatusConstant.processing}
        {statusIconMap.processing}
      </div>
    ),
    id: MeetingStatusConstant.processing,
    value: MeetingStatusConstant.processing,
  },
  {
    children: (
      <div className={'flex items-center gap-x-2 capitalize'}>
        {MeetingStatusConstant.canceled}
        {statusIconMap.canceled}
      </div>
    ),
    id: MeetingStatusConstant.canceled,
    value: MeetingStatusConstant.canceled,
  },
  {
    children: (
      <div className={'flex items-center gap-x-2 capitalize'}>
        {MeetingStatusConstant.completed}
        {statusIconMap.completed}
      </div>
    ),
    id: MeetingStatusConstant.completed,
    value: MeetingStatusConstant.completed,
  },
];

export const MeetingsStatusSelect: FC<MeetingsStatusSelectProps> = observer(
  () => {
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
  },
);
