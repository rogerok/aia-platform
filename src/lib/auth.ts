import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthClient } from 'better-auth/react';

import { db } from '@/db';
import * as schema from '@/db/schemas/schema';
import { envs } from '@/lib/constants/envs';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: envs.githubClientId,
      clientSecret: envs.githubClientSecret!,
    },
    google: {
      clientId: envs.googleClientId,
      clientSecret: envs.googleClientSecret,
    },
  },
});

export const authApi = auth.api;

export const authClient = createAuthClient({
  baseURL: envs.baseUrl,
});

export type AuthClientType = typeof authClient;

export type AuthBySocialParams = Parameters<
  AuthClientType['signIn']['social']
>[0];

type AuthAllProvidersType = AuthBySocialParams extends { provider: infer P }
  ? P
  : never;

export type AuthProvidersType = Extract<
  AuthAllProvidersType,
  'github' | 'google'
>;
