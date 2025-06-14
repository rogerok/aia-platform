import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthClient } from 'better-auth/react';

import { db } from '@/db';
import * as schema from '@/db/schemas/schema';

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
});

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
});

export type AuthClientType = typeof authClient;

export class AuthController {
  client: AuthClientType;

  constructor(client: AuthClientType) {
    this.client = client;
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string,
    onSuccess?: () => void,
    onError?: () => void,
  ) {
    await this.client.signIn.email(
      { email, password },
      {
        onError: (response) => {
          onError?.();
        },
        onSuccess: (response) => {
          onSuccess?.();
        },
      },
    );
  }
}
