'use client';

import { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/lib/hooks/use-mobile';

interface ResponsiveDialogProps {
  children: ReactNode;
  open: boolean;
  className?: string;
  description?: string;
  openText?: ReactNode;
  title?: string;
  onOpenChange?: (open: boolean) => void;
}

export const ResponsiveDialog: FC<ResponsiveDialogProps> = (props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer onOpenChange={props.onOpenChange} open={props.open}>
        <DrawerTrigger asChild>
          <Button variant="outline">{props.openText}</Button>
        </DrawerTrigger>
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
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogTrigger asChild>
        <Button variant="outline">{props.openText}</Button>
      </DialogTrigger>
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
