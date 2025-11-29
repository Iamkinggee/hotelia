"use client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/form-input"
import { User, Lock, ShoppingCart, LucideHome } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react" // Add this import

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username: data.email, // Use username (not email)
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid username or password")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="md:min-h-[600px] min-h-[500px] p-20 md:px-[200px] rounded-2xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-12"
        >
          <LucideHome className="h-16 w-16 text-white" strokeWidth={1.5} />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Show error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-400 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <FormInput
            icon={User}
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormInput
            icon={Lock}
            type="password"
            placeholder="PASSWORD"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold text-lg shadow-lg hover:from-cyan-500 hover:to-cyan-700 disabled:opacity-70"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "LOGIN"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-white/70 text-sm hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>

          <div className="text-center text-white/70 text-sm">
            Don't have an Account?
            <Link href="/register">
              <span className="text-sm hover:text-white transition pl-3 text-cyan-200">
                Sign Up
              </span>
            </Link>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}