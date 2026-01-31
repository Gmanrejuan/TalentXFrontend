import { ReactNode } from "react"
import { HeroIllustration } from "./hero-illustration"

interface AuthLayoutProps {
  children: ReactNode
  illustration?: ReactNode
  showLogo?: boolean
}

export function AuthLayout({
  children,
  illustration,
  showLogo = false,
}: AuthLayoutProps) {
  return (
    <div className="flex max-h-screen flex-col bg-background lg:flex-row">     
        <div className="flex-1">
          {illustration || <HeroIllustration />}
        </div>

      <div className="flex flex-1 flex-col">
        {showLogo && (
          <div className="p-6 lg:hidden">
          </div>
        )}
        <div className="flex flex-1 items-center justify-start p-6 lg:p-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
