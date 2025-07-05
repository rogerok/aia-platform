import Link from 'next/link';
import { ComponentProps, FC } from 'react';

import { cn } from '@/lib/utils';

export const LinkComponent: FC<ComponentProps<typeof Link>> = (props) => {
  return (
    <Link
      {...props}
      className={cn(
        'transition duration-150 hover:text-indigo-700',
        props.className,
      )}
    />
  );
};
