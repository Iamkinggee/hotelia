// schema/auth.ts
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
   password: varchar("password", { length: 255 }), 
   role: varchar("role", { length: 50 }).default("user"),

})



