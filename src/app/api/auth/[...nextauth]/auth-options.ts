import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { findMockUser } from "../../../../lib/auth/mock-storage"

// Extend NextAuth types to include id in User and Session
declare module "next-auth" {
  interface User {
    id: string
  }
  
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        console.log('NextAuth: Checking credentials for', credentials.email)
        
        // Use shared mock storage
        const user = findMockUser(credentials.email)
        
        if (!user || user.password !== credentials.password) {
          console.log('NextAuth: Invalid credentials')
          return null
        }

        console.log('NextAuth: Login successful for', user.email)
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("this is token", token)
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log("this is session", token)

      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  }
}