import { ObjectValues } from '@/lib/utils/tsUtils';

export const CallShowConstant = {
  call: 'call',
  ended: 'ended',
  lobby: 'lobby',
} as const;

export type CallShowValuesType = ObjectValues<typeof CallShowConstant>;
