


// // lib/validations/auth.ts
// import * as z from "zod"

// export const loginSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// })

// export const registerSchema = z
//   .object({
//     username: z.string().min(3, "Username must be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],  // Ensures error shows on confirmPassword field
//   })

// export type LoginInput = z.infer<typeof loginSchema>
// export type RegisterInput = z.infer<typeof registerSchema>




// lib/validations/auth.ts
import * as z from "zod"  // ← Zod v3 import (works with resolvers)

// export const loginSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// })

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],  // ← Attaches error to confirmPassword field (v3 safe)
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>