"use client"
import {  } from "@/services/auth.service"

import { AuthLayout, RegisterForm } from "@/components/auth"
import { useState } from "react"

export default function RegisterPage() {

  const handleRegister = async (data: { email: string; password: string;}) => {
    console.log(data);

  }

  const handleGoogleRegister = () => {
    console.log("Google login clicked")

  }

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={handleRegister}
        onGoogleRegister={handleGoogleRegister}
        loginHref = "/login"
      />
    </AuthLayout>
  )
}
