import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = {
      id: user.id,
      name:
        `${user.firstName} ${user.lastName}`.trim() ||
        user.username ||
        "Unknown User",
      email: user.emailAddresses[0]?.emailAddress || "",
      profileImage: user.imageUrl,
    };

    // Check if user exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);

    let dbUser;

    if (existingUser.length > 0) {
      // Update existing user
      [dbUser] = await db
        .update(usersTable)
        .set({
          name: userData.name,
          profileImage: userData.profileImage,
          updatedAt: new Date(),
        })
        .where(eq(usersTable.id, user.id))
        .returning();
    } else {
      // Create new user
      [dbUser] = await db.insert(usersTable).values(userData).returning();
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user directly from database
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);

    const dbUser = users[0];

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
