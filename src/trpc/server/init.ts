import { initTRPC } from '@trpc/server';

export const t = initTRPC.create();

export const baseProcedure = t.procedure;
