'use client';

import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { ResponsiveDialog } from '@/components/custom/ResponsiveDialog/ResponsiveDialog';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  onOpenChange: ComponentProps<typeof ResponsiveDialog>['onOpenChange'];
  open: ComponentProps<typeof ResponsiveDialog>['open'];
  title: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelCb: () => void;
  confirmCb: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = observer(
  (props) => {
    const {
      cancelButtonText = 'No',
      cancelCb,
      confirmButtonText = 'Yes',
      confirmCb,
      onOpenChange,
      open,
      title,
    } = props;

    return (
      <ResponsiveDialog onOpenChange={onOpenChange} open={open}>
        <div className={'flex flex-col gap-4'}>
          <h4 className={'text-center text-xl'}>{title}</h4>
          <div className={'mt-4 flex justify-between'}>
            <Button onClick={confirmCb} variant={'destructive'}>
              {confirmButtonText}
            </Button>
            <Button onClick={cancelCb}>{cancelButtonText}</Button>
          </div>
        </div>
      </ResponsiveDialog>
    );
  },
);
