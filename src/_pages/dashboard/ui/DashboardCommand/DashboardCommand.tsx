import { ComponentProps, FC } from 'react';

import { CommandDialog, CommandInput } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface DashboardCommandProps {
  open: boolean;
  setOpen: ComponentProps<typeof CommandDialog>['onOpenChange'];
  className?: string;
}

export const DashboardCommand: FC<DashboardCommandProps> = (props) => {
  return (
    <CommandDialog
      className={cn(props.className)}
      onOpenChange={props.setOpen}
      open={props.open}
      showCloseButton
    >
      <CommandInput placeholder="Search..." />
    </CommandDialog>
  );
};
