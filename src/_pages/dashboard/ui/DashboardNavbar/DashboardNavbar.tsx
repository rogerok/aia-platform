'use client';

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { CommandDialogStore } from '@/_pages/dashboard/store/commandDialogStore';
import { DashboardCommand } from '@/_pages/dashboard/ui/DashboardCommand/DashboardCommand';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface DashboardNavbarProps {
  className?: string;
}

export const DashboardNavbar: FC<DashboardNavbarProps> = observer((props) => {
  const { isMobile, open, toggleSidebar } = useSidebar();
  const [shortcutStore] = useState(() => new CommandDialogStore());

  useEffect(() => {
    shortcutStore.listenToKeyPress();

    return () => {
      shortcutStore.removeEventListener();
    };
  }, [shortcutStore]);

  return (
    <nav
      className={cn(
        'bg-background flex w-full items-center gap-x-2 border-b px-4 py-2',
        props.className,
      )}
    >
      <Button className={'size-9'} onClick={toggleSidebar} variant={'outline'}>
        {open || isMobile ? <PanelLeftCloseIcon /> : <PanelLeftIcon />}
      </Button>
      <Button
        className={
          'text-muted-foreground hover:text-muted-foreground h-9 w-[240px] justify-start font-normal'
        }
        onClick={shortcutStore.openDialog}
        size={'sm'}
        variant={'outline'}
      >
        <SearchIcon />
        <kbd
          className={
            'bg-muted pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded px-1.5 font-mono text-xs text-[10px] font-medium select-none'
          }
        >
          <span>&#8984;</span>K
        </kbd>
      </Button>
      <DashboardCommand
        open={shortcutStore.open}
        setOpen={shortcutStore.setOpen}
      />
    </nav>
  );
});
