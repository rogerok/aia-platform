import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.development.local' });

export default defineConfig({
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/db/schemas/schema.ts',
});
