import { CreditCardIcon } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/lib/utils';

interface BillingLabelProps {
  className?: string;
}

export const BillingLabel: FC<BillingLabelProps> = (props) => {
  return (
    <span
      className={cn(
        'flex w-full items-center justify-center gap-4',
        props.className,
      )}
    >
      <span>Billing</span>
      <CreditCardIcon className={'size-4'} />
    </span>
  );
};
