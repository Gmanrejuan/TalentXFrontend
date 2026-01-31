"use client"

import { AuthLayout, LoginForm } from "@/components/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { addMockUser } from "@/lib/auth/mock-storage"
import bcrypt from "bcryptjs"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
    }
  }

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </AuthLayout>
  )
}