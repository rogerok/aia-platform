import { FC } from 'react';

import { cn } from '@/lib/utils';

interface UserMenuLabelProps {
  email: string;
  className?: string;
}

export const UserMenuLabel: FC<UserMenuLabelProps> = (props) => {
  return (
    <div className={cn('flex flex-col gap-1', props.className)}>
      <span className={'truncate font-medium'}>Account</span>
      <span className={'text-muted-foreground text-sm font-normal'}>
        {props.email}
      </span>
    </div>
  );
};
