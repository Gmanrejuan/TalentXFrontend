"use client"

import { AuthLayout, RegisterForm } from "@/components/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      console.log('Frontend: Starting registration process', { email: data.email })

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Frontend: Registration API response status:', response.status)

      if (response.ok) {
        const responseData = await response.json()
        console.log('Frontend: Registration successful', responseData)

        // Add a small delay to ensure user is saved
        await new Promise(resolve => setTimeout(resolve, 100))

        console.log('Frontend: Attempting NextAuth signIn', { email: data.email })

        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        console.log('Frontend: NextAuth signIn result', result)

        if (result?.ok) {
          console.log('Frontend: Login successful, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          console.log('Frontend: Login failed, redirecting to login page')
          console.log('Frontend: Error details:', result?.error)
          router.push('/login')
          toast.success('Account created! Please log in.')
        }
      } else {
        const error = await response.json()
        console.log('Frontend: Registration failed', error)
        toast.error(error.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Frontend: Registration error', error)
      toast.error('An error occurred during registration')
    }
  }

  const handleGoogleRegister = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={handleRegister}
        onGoogleRegister={handleGoogleRegister}
        loginHref="/login"
      />
    </AuthLayout>
  )
}