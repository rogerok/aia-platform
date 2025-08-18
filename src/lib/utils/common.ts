import humanizeDuration from 'humanize-duration';

import { MaybeFn } from '@/lib/utils/tsUtils';

export const callFunction = <TValue, TArgs extends any[] = []>(
  fn: MaybeFn<TValue, TArgs>,
  ...args: TArgs
) => {
  if (typeof fn === 'function') {
    return (fn as any)(...args) as TValue;
  }

  return fn;
};

export const formatDuration = (ms: number) => {
  return humanizeDuration(ms * 1000, {
    largest: 1,
    round: true,
    units: ['h', 'm', 's'],
  });
};
