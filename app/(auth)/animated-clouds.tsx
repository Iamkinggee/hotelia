// components/auth/animated-clouds.tsx
"use client"

import { motion } from "framer-motion"

export function AnimatedClouds() {
  return (
    <>
      {/* Cloud 1 */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Cloud 2 */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Cloud 3 */}
      <motion.div
        className="absolute bottom-10 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Cloud 4 */}
      <motion.div
        className="absolute bottom-0 right-10 w-72 h-72 bg-white/8 rounded-full blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle center glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </>
  )
}