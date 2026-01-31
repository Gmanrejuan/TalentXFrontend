"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Page() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="text-4xl flex min-h-screen w-full items-center justify-center">
        Loading...
      </div>
    )
  }

  if (session) {
    // User is signed in
    return (
      <div className="flex min-h-screen w-full items-center justify-center flex-col gap-4">
        <h1 className="text-4xl">Welcome, {session.user?.name || session.user?.email}!</h1>
        <Link href="/dashboard" className="text-2xl text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    )
  }

  // User is not signed in
  return (
    <Link href='/login' className="text-4xl flex min-h-screen w-full items-center justify-center">
      Click to go login
    </Link>
  )
}