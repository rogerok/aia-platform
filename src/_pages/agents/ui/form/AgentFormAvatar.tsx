import { FC, memo } from 'react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';

interface AgentFormAvatarProps {
  name: string;
}

export const AgentFormAvatar: FC<AgentFormAvatarProps> = memo((props) => {
  return <GeneratedAvatar firstName={props.name} />;
});
