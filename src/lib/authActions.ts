'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authApi } from '@/lib/auth';
import { routes } from '@/lib/constants/routes';

export const getSession = async () => {
  let resp;
  const headersData = await headers();

  try {
    resp = await authApi.getSession({
      headers: headersData,
    });
  } catch (e) {
    // TODO: implement errors handling
    console.log(e);
  }

  return resp;
};

export async function handleIsNotAuth(route = routes.signIn()) {
  const resp = await getSession();

  if (!resp) {
    redirect(route);
  }
}

export async function handleIsAuth(route = routes.home()) {
  const resp = await getSession();

  if (!!resp) {
    redirect(route);
  }
}
