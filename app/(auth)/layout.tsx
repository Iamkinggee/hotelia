// // app/(auth)/layout.tsx
// import { ReactNode } from "react";

// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900">
//       {children}
//     </div>
//   );
// }



// app/(auth)/layout.tsx
import { AnimatedClouds } from "./animated-clouds"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 overflow-hidden">
      {/* This is now a Client Component – safe to use motion */}
      <AnimatedClouds />

      {/* Page content on top */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {children}
      </div>
    </div>
  )
}