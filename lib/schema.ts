import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  profileImage: varchar({ length: 255 }).notNull(),
  credits: integer().default(3),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
