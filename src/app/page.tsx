"use client"

import { AuthLayout, LoginForm } from "@/components/auth"
import Link from "next/link"

export default function Page() {
  return (
    <Link href='/login' className="text-4xl flex min-h-screen w-full items-center justify-center">Click to go login</Link>
  )
}
