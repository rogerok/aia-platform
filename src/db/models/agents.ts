import { agents } from '@/db/schemas/schema';

export type SelectAgent = typeof agents.$inferSelect;
export type InsertAgent = typeof agents.$inferInsert;
