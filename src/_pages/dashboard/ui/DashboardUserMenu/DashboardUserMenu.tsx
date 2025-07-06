'use client';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { UserDrawer } from '@/_pages/dashboard/ui/DashboardUserMenu/UserDrawer';
import { UserDropdown } from '@/_pages/dashboard/ui/DashboardUserMenu/UserDropdown';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { useRootStore } from '@/lib/stores/rootStore';

export const DashboardUserMenu: FC = observer(() => {
  const { authStore } = useRootStore();

  const user = authStore.getSession()?.user;

  const isMobile = useIsMobile();

  if (isMobile && user) {
    return <UserDrawer email={user.email} name={user.name} />;
  }

  return user && <UserDropdown email={user.email} name={user.name} />;
});
