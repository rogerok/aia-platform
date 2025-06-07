import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <section
      className={
        'bg-muted flex h-svh w-full items-center justify-center p-6 md:p-10'
      }
    >
      <div className={'flex w-full max-w-sm flex-col md:max-w-3xl'}>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
