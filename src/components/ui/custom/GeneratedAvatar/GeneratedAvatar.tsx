import { FC } from 'react';

import { cn } from '@/lib/utils';

interface GeneratedAvatarProps {
  className?: string;
}

export const GeneratedAvatar: FC<GeneratedAvatarProps> = (props) => {
  return <div className={cn(props.className)}>GeneratedAvatar</div>;
};
