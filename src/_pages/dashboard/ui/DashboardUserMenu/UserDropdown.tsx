'use client';

import { ChevronDownIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BillingLabel } from '@/_pages/dashboard/ui/DashboardUserMenu/BillingLabel';
import { LogoutLabel } from '@/_pages/dashboard/ui/DashboardUserMenu/LogoutLabel';
import { UserButtonTitle } from '@/_pages/dashboard/ui/DashboardUserMenu/UserButtonTitle';
import { UserMenuLabel } from '@/_pages/dashboard/ui/DashboardUserMenu/UserMenuLabel';
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

interface UserDropdownProps {
  // TODO: pass full entity
  email: string;
  name: string;
  className?: string;
  image?: string | null;
}

export const UserDropdown: FC<UserDropdownProps> = observer((props) => {
  const { authStore } = useRootStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          'border-border/10 flex w-full items-center gap-4 overflow-hidden rounded-lg bg-stone-500 p-2 text-white transition duration-150 hover:cursor-pointer hover:bg-stone-300'
        }
      >
        {props.image ? (
          <Avatar>
            <AvatarImage height={36} src={props.image} width={36} />
          </Avatar>
        ) : (
          <GeneratedAvatar firstName={props.name} />
        )}
        <UserButtonTitle email={props.email} name={props.name} />
        <ChevronDownIcon className={'ml-auto size-4 shrink-0'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className={'w-72'} side={'right'}>
        <DropdownMenuLabel>
          <UserMenuLabel email={props.email} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={'flex cursor-pointer items-center justify-between'}
        >
          <BillingLabel />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={'flex cursor-pointer items-center justify-between'}
          onClick={authStore.logout}
        >
          <LogoutLabel />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
