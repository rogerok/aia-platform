import { initTRPC, TRPCError } from '@trpc/server';

import { getSession } from '@/lib/authActions';

export const t = initTRPC.create();

export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed({
  ctx,
  next,
}) {
  const session = await getSession();

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: { ...ctx, auth: session },
  });
});
export const createTRPCRouter = t.router;
