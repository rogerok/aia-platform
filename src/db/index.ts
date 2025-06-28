import { drizzle } from 'drizzle-orm/neon-http';

import { envs } from '@/lib/constants/envs';

export const db = drizzle(envs.dbURl);
