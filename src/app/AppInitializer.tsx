'use client';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { useRouterStoreHydration } from '@/lib/stores/routerStore';

interface AppInitializerProps {
  children: ReactNode;
  className?: string;
}

export const AppInitializer: FC<AppInitializerProps> = (props) => {
  const router = useRouter();
  useRouterStoreHydration((store) => store.init(router));

  return <>{props.children}</>;
};
