import { Loader2Icon } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  description?: string;
  title?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  const { className, description, title = 'Loading' } = props;

  return (
    <div
      className={cn(
        'flex flex-1/2 items-center justify-center px-8 py-4',
        className,
      )}
    >
      <div
        className={
          'gap bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm'
        }
      >
        <Loader2Icon className={'text-primary size-6 animate-spin'} />
        <div className={'flex flex-col gap-y-2 text-center'}>
          <h6 className={'text-lg font-medium'}>{title}</h6>
          <p className={'text-sm'}>{description}</p>
        </div>
      </div>
    </div>
  );
};
