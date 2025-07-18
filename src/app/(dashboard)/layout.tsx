import { FC, ReactNode } from 'react';

import { DashboardNavbar } from '@/_pages/dashboard/ui/DashboardNavbar/DashboardNavbar';
import { DashboardSidebar } from '@/_pages/dashboard/ui/DashboardSidebar/DashboardSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className={'bg-muted flex h-screen w-screen flex-col'}>
        <DashboardNavbar />
        {props.children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
