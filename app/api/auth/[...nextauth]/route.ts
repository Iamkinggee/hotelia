// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import { users } from "@/schema/auth"
// import { eq } from "drizzle-orm"
// import bcrypt from "bcryptjs"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },


//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null
//         }

//         // Find user by email (using username field as email)
//         const user = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials.username))
//           .limit(1)

//         if (!user || user.length === 0) {
//           return null
//         }

//         const foundUser = user[0]

//         // Check password
//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           foundUser.password || ""
//         )

//         if (!isValidPassword) {
//           return null
//         }

//         return {
//           id: foundUser.id.toString(),
//           email: foundUser.email,
//           name: foundUser.name,
//           role: foundUser.role,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         // token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role
//       }
//       return session
//     },
//   },
// })

// export { handler as GET, handler as POST }











// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import { users } from "@/schema/auth"
// import { eq } from "drizzle-orm"
// import bcrypt from "bcryptjs"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null
//         }

//         // Find user by email (using username field as email)
//         const user = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials.username))
//           .limit(1)

//         if (!user || user.length === 0) {
//           return null
//         }

//         const foundUser = user[0]

//         // Check password
//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           foundUser.password || ""
//         )

//         if (!isValidPassword) {
//           return null
//         }

//         return {
//           id: foundUser.id.toString(),
//           email: foundUser.email,
//           name: foundUser.name,
//           role: foundUser.role,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role  // FIX: Uncommented this line
//         token.id = user.id      // Also add the user ID to the token
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role
//         session.user.id = token.id  // Also add ID to session if needed
//       }
//       return session
//     },
//   },
// })

// export { handler as GET, handler as POST }













// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import { users } from "@/schema/auth"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("🔍 Authorize called with:", { 
          username: credentials?.username,
          hasPassword: !!credentials?.password 
        })

        if (!credentials?.username || !credentials?.password) {
          console.log("❌ Missing credentials")
          return null
        }

        try {
          // Find user by email (using username field as email)
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.username))
            .limit(1)

          console.log("📊 User query result:", { 
            found: user?.length > 0,
            email: user?.[0]?.email,
            role: user?.[0]?.role,
            hasPassword: !!user?.[0]?.password
          })

          if (!user || user.length === 0) {
            console.log("❌ User not found")
            return null
          }

          const foundUser = user[0]

          if (!foundUser.password) {
            console.log("❌ User has no password set")
            return null
          }

          // Check password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            foundUser.password
          )

          console.log("🔑 Password validation:", { isValid: isValidPassword })

          if (!isValidPassword) {
            console.log("❌ Invalid password")
            return null
          }

          console.log("✅ Login successful for:", foundUser.email)

          return {
            id: foundUser.id.toString(),
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          }
        } catch (error) {
          console.error("❌ Error during authorization:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        console.log("📝 JWT callback - adding user to token:", user.email)
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        console.log("📝 Session callback - adding token to session")
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }