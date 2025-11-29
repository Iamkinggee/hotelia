"use client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/form-input"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Register:", data)
    setIsLoading(false)
  }

  return (
        <div className="md:min-h-[600px] min-h-[500px] p-20 md:px-[200px] rounded-2xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Register</h1>
          <p className="text-white/70 text-sm">
            Please enter your Name, Login and your Password
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormInput icon={User} placeholder="Username" error={errors.username?.message} {...register("username")} />
          
          <FormInput icon={Mail} type="email" placeholder="Email" error={errors.email?.message} {...register("email")} />
          
          <div className="relative">
            <FormInput
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-white/50 hover:text-white z-10"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <FormInput
              icon={Lock}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter Password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-4 text-white/50 hover:text-white z-10"
            >
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold text-lg shadow-lg hover:from-cyan-500 hover:to-cyan-700 disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-white/80 text-sm hover:text-white">
              Already have an Account?{" "}
              <span className="text-cyan-400 font-medium">Sign in</span>
            </Link>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}