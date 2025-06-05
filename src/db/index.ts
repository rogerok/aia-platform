import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('DATABASE_URL does not exist');
}

export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL);
