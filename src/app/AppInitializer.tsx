// 'use client';
// import { useRouter } from 'next/navigation';
// import { FC } from 'react';
//
// import {
//   RouterProvider,
//   useRouterStoreHydration,
// } from '@/lib/stores/RootStore';
//
// interface AppInitializerProps {
//   className?: string;
// }
//
// export const AppInitializer: FC<AppInitializerProps> = (props) => {
//   const router = useRouter();
//   useRouterStoreHydration((store) => store.init(router));
//
//   return <RouterProvider>{props.children}</RouterProvider>;
// };
