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
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useRootStore } from '@/lib/stores/rootStore';

interface DashboardUserDrawerProps {
  // TODO: pass full entity
  email: string;
  name: string;
  className?: string;
  image?: string | null;
}

export const UserDrawer: FC<DashboardUserDrawerProps> = observer((props) => {
  const { authStore } = useRootStore();

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className={
          'border-border/10 flex w-full items-center gap-4 overflow-hidden rounded-lg bg-stone-500 p-2 text-white transition duration-150 hover:cursor-pointer hover:bg-stone-300'
        }
      >
        <div>
          {props.image ? (
            <Avatar>
              <AvatarImage height={36} src={props.image} width={36} />
            </Avatar>
          ) : (
            <GeneratedAvatar firstName={props.name} />
          )}
          <UserButtonTitle email={props.email} name={props.name} />

          <ChevronDownIcon className={'ml-auto size-4 shrink-0'} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <UserMenuLabel email={props.email} />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={authStore.logout} variant={'outline'}>
            <LogoutLabel />
          </Button>
          <Button onClick={authStore.logout} variant={'outline'}>
            <BillingLabel />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
