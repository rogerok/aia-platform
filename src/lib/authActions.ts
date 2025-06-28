'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authApi } from '@/lib/auth';
import { routes } from '@/lib/constants/routes';

const getSession = async () => {
  return await authApi.getSession({
    headers: await headers(),
  });
};

export async function handleIsNotAuth(route = routes.signIn()) {
  if (!(await getSession())) {
    redirect(route);
  }
}

export async function handleIsAuth(route = routes.home()) {
  if (await getSession()) {
    redirect(route);
  }
}
