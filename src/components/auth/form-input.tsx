import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = "text", placeholder, className, id, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

    return(
      <div className={cn("space-y-2", className)}>
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <input type={isPassword ? (showPassword ? "text" : "password") : type}
          id={inputId}
          ref = {ref}
          placeholder={placeholder}
          className={cn("h-11 w-full rounded-lg border border-border bg-input/50 px-4 text-sm text-foreground placeholder:text-muted-foreground",
            "transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
            isPassword && "pr-10",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20"
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
          </button>
        )}
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"