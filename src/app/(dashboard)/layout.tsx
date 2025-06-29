import { FC, ReactNode } from 'react';

import { DashboardSidebar } from '@/_pages/dashboard/ui/DashboardSidebar/DashboardSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        {props.children}
      </SidebarProvider>
    </div>
  );
};

export default Layout;
