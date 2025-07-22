'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface DataPaginationProps {
  page: number;
  totalPages: number;
  className?: string;
  onPageChange: (page: number) => Promise<void>;
}

export const DataPagination: FC<DataPaginationProps> = observer((props) => {
  return (
    <div className={'flex items-center justify-between'}>
      <div className={'text-muted-foreground flex-1 text-sm'}>
        Page {props.page} of {props.totalPages || 1}
      </div>
      <Button
        disabled={props.page === 1}
        onClick={() => props.onPageChange(Math.max(1, props.page - 1))}
        size={'sm'}
        variant={'outline'}
      >
        Previous
      </Button>
      <Button
        disabled={!props.totalPages || props.page === props.totalPages}
        onClick={() =>
          props.onPageChange(Math.min(props.totalPages, props.page + 1))
        }
        size={'sm'}
        variant={'outline'}
      >
        Next
      </Button>
    </div>
  );
});
