import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import { FC } from 'react';

import { DashboardSidebarItem } from '@/_pages/dashboard/ui/DashboardSidebar/DashboardSidebarItem';
import { DashboardUserMenu } from '@/_pages/dashboard/ui/DashboardUserMenu/DashboardUserMenu';
import { LinkComponent } from '@/components/custom/LinkComponent/LinkComponent';
import { Logo } from '@/components/custom/Logo/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { routes } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const sidebarFirstGroup = [
  {
    icon: VideoIcon,
    title: 'Meetings',
    url: routes.meetings(),
  },
  {
    icon: BotIcon,
    title: 'Agents',
    url: routes.agents(),
  },
];

const sidebarSecondGroup = [
  {
    icon: StarIcon,
    title: 'Upgrade',
    url: routes.upgrade(),
  },
];

export const DashboardSidebar: FC<SidebarProps> = (props) => {
  return (
    <Sidebar className={cn(props.className)}>
      <SidebarHeader
        className={'text-sidebar-accent-foreground py-6 text-center'}
      >
        <LinkComponent
          className={'flex items-center gap-2'}
          href={routes.home()}
        >
          <Logo height={36} width={36} />
          <span className={'text-2xl'}>AIA Platform</span>
        </LinkComponent>
      </SidebarHeader>
      <div className={'px-4 py-4'}>
        <SidebarSeparator className={'m-0'} />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className={'flex flex-col gap-2'}>
            {sidebarFirstGroup.map((item) => (
              <DashboardSidebarItem
                icon={<item.icon />}
                key={item.url}
                title={item.title}
                url={item.url}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className={'px-4 py-4'}>
          <SidebarSeparator className={'m-0'} />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarSecondGroup.map((item) => (
                <DashboardSidebarItem
                  icon={<item.icon />}
                  key={item.url}
                  title={item.title}
                  url={item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};
