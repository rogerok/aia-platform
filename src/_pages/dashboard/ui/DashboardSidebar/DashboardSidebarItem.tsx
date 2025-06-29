'use client';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { LinkComponent } from '@/components/ui/custom/LinkComponent/LinkComponent';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface DashboardSidebarItemProps {
  icon: ReactNode;
  title: string;
  url: string;
  className?: string;
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = (props) => {
  const isActive = usePathname() === props.url;

  return (
    <SidebarMenuItem className={cn(props.className)}>
      <SidebarMenuButton
        className={cn('p-0', isActive && 'bg-gray-300 hover:bg-gray-300')}
        isActive={isActive}
      >
        <LinkComponent
          className={'flex h-full w-full items-center gap-4 text-lg'}
          href={props.url}
        >
          {props.icon}
          <span>{props.title}</span>
        </LinkComponent>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
