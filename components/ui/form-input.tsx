import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { forwardRef } from "react"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ icon: Icon, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          icon={<Icon className="h-5 w-5" />}
          className={cn(error && "border-red-500/50 focus:ring-red-500/50", className)}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="absolute -bottom-5 left-0 text-xs text-red-400 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"