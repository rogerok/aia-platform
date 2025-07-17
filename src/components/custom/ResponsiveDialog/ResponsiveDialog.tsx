'use client';

import { FC, ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/lib/hooks/use-mobile';

interface ResponsiveDialogProps {
  children: ReactNode;
  open: boolean;
  description?: string;
  openText?: ReactNode;
  title?: string;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export const ResponsiveDialog: FC<ResponsiveDialogProps> = (props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        onClose={props.onClose}
        onOpenChange={props.onOpenChange}
        open={props.open}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <div className={'p-4'}>{props.children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          props.onClose?.();
        }
        props.onOpenChange?.(open);
      }}
      // onOpenChange={props.onOpenChange}
      open={props.open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
