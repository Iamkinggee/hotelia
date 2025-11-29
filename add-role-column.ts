// add-role-column.ts
import { config } from "dotenv";
config();

import { db } from "./lib/db";
import { sql } from "drizzle-orm";

async function addRoleColumn() {
  try {
    console.log("🔧 Adding role column to users table...");
    
    // Add the role column if it doesn't exist
    await db.execute(sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'
    `);
    
    console.log("✓ Role column added successfully");
    console.log("\nNow you can run: npx tsx create-admin.ts");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to add column:", err);
    process.exit(1);
  }
}

addRoleColumn();