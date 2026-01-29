"use client"
import { login } from "@/services/auth.service"

import { AuthLayout, LoginForm } from "@/components/auth"
import { useState } from "react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await login(data)
      console.log(response);
      
      localStorage.setItem('token', response.token)
      
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")

  }

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        forgotPasswordHref="/forgot-password"
        signUpHref="/register"
      />
    </AuthLayout>
  )
}
