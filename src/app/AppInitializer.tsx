'use client';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { useRootStoreHydration } from '@/lib/stores/rootStore';

interface AppInitializerProps {
  children: ReactNode;
  className?: string;
}

export const AppInitializer: FC<AppInitializerProps> = (props) => {
  const router = useRouter();

  useRootStoreHydration((store) => store.router.init(router));

  return <>{props.children}</>;
};
