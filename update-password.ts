import { config } from "dotenv";
config();

import { db } from "./lib/db";
import { users } from "./schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function updatePassword() {
  try {
    const email = "admin@hotelia.com";
    const newPassword = "hotelia123"; // Change this to your desired password
    
    console.log("Updating password for:", email);
    
    const hash = await bcrypt.hash(newPassword, 10);

    const result = await db
      .update(users)
      .set({ password: hash })
      .where(eq(users.email, email))
      .returning();

    if (result.length > 0) {
      console.log("✓ Password updated successfully");
      console.log("Email:", email);
      console.log("New Password:", newPassword);
    } else {
      console.log("✗ User not found");
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Failed to update password:", err);
    process.exit(1);
  }
}

updatePassword();