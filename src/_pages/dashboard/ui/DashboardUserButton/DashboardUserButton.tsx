'use client';
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GeneratedAvatar } from '@/components/custom/GeneratedAvatar/GeneratedAvatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRootStore } from '@/lib/stores/rootStore';

export const DashboardUserButton: FC = observer(() => {
  const { authStore } = useRootStore();
  const user = authStore.getSession()?.user;

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            'border-border/10 flex w-full items-center gap-4 overflow-hidden rounded-lg bg-stone-500 p-2 text-white transition duration-150 hover:cursor-pointer hover:bg-stone-300'
          }
        >
          {user.image ? (
            <Avatar>
              <AvatarImage height={36} src={user.image} width={36} />
            </Avatar>
          ) : (
            <GeneratedAvatar firstName={user.name} />
          )}
          <div className={'flex flex-col gap-1 overflow-hidden'}>
            <p className={'w-full truncate'}>{user.name}</p>
            <p className={'w-full truncate'}>{user.email}</p>
          </div>
          <ChevronDownIcon className={'ml-auto size-4 shrink-0'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'} className={'w-72'} side={'right'}>
          <DropdownMenuLabel>
            <div className={'flex flex-col gap-1'}>
              <span className={'truncate font-medium'}>Account</span>
              <span className={'text-muted-foreground text-sm font-normal'}>
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={'flex cursor-pointer items-center justify-between'}
          >
            Billing
            <CreditCardIcon className={'size-4'} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={'flex cursor-pointer items-center justify-between'}
            onClick={authStore.signOut}
          >
            Logout
            <LogOutIcon className={'size-4'} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
});
