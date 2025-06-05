'use client';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '@/lib/store-adapter/store';

export const Comp: FC = observer((props) => {
  const store = useRootStore();

  return <div onClick={store.increment}> {store.count}</div>;
});
