// hooks/use-toast.ts
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
  action?: React.ReactNode
}

const ACTION_ICONS = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
} as const

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const router = useRouter()

  function toast({
    title,
    description,
    variant = "default",
    duration = 5000,
    action,
  }: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substr(2, 9)

    setToasts((prev) => [
      ...prev,
      {
        id,
        title,
        description,
        variant,
        duration,
        action,
      },
    ])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }

  function dismiss(id?: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toast, dismiss, toasts }
}