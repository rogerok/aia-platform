import { defineConfig } from 'drizzle-kit';

import { envs } from '@/lib/constants/envs';

export default defineConfig({
  dbCredentials: {
    url: envs.dbURl,
  },
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/db/schemas/schema.ts',
});
