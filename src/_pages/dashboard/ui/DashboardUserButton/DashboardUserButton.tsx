'use client';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRootStore } from '@/lib/stores/rootStore';

export const DashboardUserButton: FC = observer(() => {
  const { authClient } = useRootStore();
  const user = authClient.session.data?.user;

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            'border-border/10 flex w-full items-center justify-center overflow-hidden rounded-lg bg-stone-500 p-2 text-white transition duration-150 hover:cursor-pointer hover:bg-stone-300'
          }
        >
          {user.image ? (
            <Avatar>
              <AvatarImage height={36} src={user.image} width={36} />
            </Avatar>
          ) : (
            <GeneratedAvatar firstName={user.name} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
});
