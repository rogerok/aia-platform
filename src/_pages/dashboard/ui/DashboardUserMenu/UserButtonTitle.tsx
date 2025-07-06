import { FC } from 'react';

import { cn } from '@/lib/utils';

interface UserButtonTitleProps {
  email: string;
  name: string;
  className?: string;
}

export const UserButtonTitle: FC<UserButtonTitleProps> = (props) => {
  return (
    <div className={cn('flex flex-col gap-1 overflow-hidden', props.className)}>
      <p className={'w-full truncate'}>{props.name}</p>
      <p className={'w-full truncate'}>{props.email}</p>
    </div>
  );
};
