// verify-admin.ts
import { config } from "dotenv";
config();

import { db } from "./lib/db";
import { users } from "./schema/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function verifyAdmin() {
  try {
    const email = "admin@hotelia.com";
    
    console.log("🔍 Looking for user:", email);
    
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      console.log("❌ User not found in database");
      process.exit(1);
    }

    const user = result[0];
    
    console.log("\n📋 User Details:");
    console.log("- ID:", user.id);
    console.log("- Name:", user.name);
    console.log("- Email:", user.email);
    console.log("- Role:", user.role);
    console.log("- Has Password:", !!user.password);
    console.log("- Password Hash (first 20 chars):", user.password?.substring(0, 20) + "...");

    // Test password
    const testPassword = "hotelia123";
    console.log("\n🔑 Testing password:", testPassword);
    
    if (user.password) {
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log("- Password matches:", isValid ? "✅ YES" : "❌ NO");
      
      if (!isValid) {
        console.log("\n💡 Password doesn't match. Try running update-password.ts");
      }
    } else {
      console.log("❌ No password set for user");
    }
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

verifyAdmin();