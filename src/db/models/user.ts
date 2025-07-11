import { user } from '@/db/schemas/schema';

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;
