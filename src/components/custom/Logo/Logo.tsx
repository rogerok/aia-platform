import Image from 'next/image';
import { FC } from 'react';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export const Logo: FC<LogoProps> = (props) => {
  const { height = 120, width = 120 } = props;

  return (
    <Image
      alt={'logo'}
      className={cn(props.className)}
      height={width}
      src={'/logo.svg'}
      width={height}
    />
  );
};
