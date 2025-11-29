


// create-admin.ts
import { db } from "./lib/db";
import { users } from "./schema/auth";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    console.log("Creating admin user...");
    
    const hash = await bcrypt.hash("admin123", 10);

    const result = await db.insert(users).values({
      name: "Admin",
      email: "admin@hotelia.com",
      password: hash,
      role: "admin",
    }).onConflictDoNothing().returning();

    if (result.length > 0) {
      console.log("✓ Admin user created successfully");
      console.log("Email: admin@hotelia.com");
      console.log("Password: admin123");
    } else {
      console.log("ℹ Admin user already exists");
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Failed to create admin:", err);
    process.exit(1);
  }
}

createAdmin();


















// // create-admin.ts
// import { db } from "@/lib/db";
// import { users } from "@/schema/auth";
// import bcrypt from "bcryptjs";

// async function createAdmin() {
//   try {
//     console.log("Creating admin user...");

//     const email = "admin@hotelia.com";
//     const plainPassword = "admin123";
//     const hash = await bcrypt.hash(plainPassword, 12); // 12 is more secure than 10

//     const result = await db
//       .insert(users)
//       .values({
//         name: "Admin",
//         email: email.toLowerCase(), // always store lowercase!
//         password: hash,
//         role: "admin" as const,
//       })
//       .onConflictDoNothing() // ignores if email already exists
//       .returning({ id: users.id, email: users.email });

//     if (result.length > 0) {
//       console.log("Admin user created successfully!");
//       console.log("Email: admin@hotelia.com");
//       console.log("Password: hotelia");
//     } else {
//       console.log("Admin user already exists");
//     }

//     process.exit(0);
//   } catch (err: any) {
//     console.error("Failed to create admin:", err.message || err);
//     process.exit(1);
//   }
// }

// createAdmin();