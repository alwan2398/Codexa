import { db } from "./db";
import { usersTable, type User, type NewUser } from "./schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string): Promise<User | null> {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  return users[0] || null;
}

export async function createUser(user: NewUser): Promise<User> {
  const newUser = await db.insert(usersTable).values(user).returning();

  return newUser[0];
}

export async function upsertUser(user: NewUser): Promise<User> {
  const existingUser = await getUserById(user.id);

  if (existingUser) {
    // Update existing user
    const updatedUser = await db
      .update(usersTable)
      .set({
        name: user.name,
        profileImage: user.profileImage,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, user.id))
      .returning();

    return updatedUser[0];
  } else {
    // Create new user
    return await createUser(user);
  }
}
