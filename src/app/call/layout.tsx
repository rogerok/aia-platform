import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return <div className={'h-screen bg-black'}>{children}</div>;
};

export default Layout;
