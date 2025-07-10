import { baseProcedure, t } from '@/trpc/server/init';

export const appRouter = t.router({
  hello: baseProcedure.query((opts) => 'hello'),
});

export type AppRouter = typeof appRouter;
