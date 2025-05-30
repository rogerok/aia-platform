import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error(
    'NEON_DATABASE_URL must be a Neon postgres connection string',
  );
}

export const db = drizzle(process.env.NEON_DATABASE_URL);
