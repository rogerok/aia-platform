import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/db/schemas/schema.ts',
});
