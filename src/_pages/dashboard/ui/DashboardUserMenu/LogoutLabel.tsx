import { LogOutIcon } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/lib/utils';

interface LogoutLabelProps {
  className?: string;
}

export const LogoutLabel: FC<LogoutLabelProps> = (props) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center gap-4',
        props.className,
      )}
    >
      <span>Logout</span>
      <LogOutIcon className={'size-4'} />
    </div>
  );
};
