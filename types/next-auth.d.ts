// // types/next-auth.d.ts
// import { DefaultSession, DefaultUser } from "next-auth"
// import { JWT } from "next-auth/jwt"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role: string | null | undefined   // adjust type if you use enum
//     } & DefaultSession["user"]
//   }

//   interface User extends DefaultUser {
//     role: string | null | undefined
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string | null
//   }
// }




// // types/next-auth.d.ts
// import "next-auth";
// import "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     id?: string;
//   }
// }








// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string                        // Added id property
      role: string | null | undefined   // adjust type if you use enum
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string | null | undefined
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string       // Added id property
    role?: string | null
  }
}
