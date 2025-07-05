'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authApi } from '@/lib/auth';
import { routes } from '@/lib/constants/routes';

const getSession = async () => {
  let resp;

  try {
    resp = await authApi.getSession({
      headers: await headers(),
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
