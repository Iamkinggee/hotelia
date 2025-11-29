"use client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/form-input"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { useState } from "react"

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotForm = z.infer<typeof forgotSchema>

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data: ForgotForm) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    // <div className="min-h-screen  flex items-center justify-center px-4">
    //   <motion.div
    //     initial={{ opacity: 0, scale: 0.95 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     className="w-full max-w-md"
    //   >

    <>

       {/* Back to Login */}
     
    
    
    
   





    <div className="md:min-h-[600px] min-h-[500px] p-20 md:px-[200px] rounded-2xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 flex items-center justify-center ">


        




      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >

        {/* Back to Login */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Login</span>
        </Link> 

     

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Forgot Password?</h1>
          <p className="text-white/70">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormInput
              icon={Mail}
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold text-lg shadow-lg hover:from-cyan-500 hover:to-cyan-700"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 bg-white/10 backdrop-blur-sm rounded-2xl"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Check Your Email</h3>
            <p className="text-white/80 px-8">
              We have sent a password reset link to your email address.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
     </>
  )
}