import { NextRequest, NextResponse } from "next/server"
import { addMockUser, findMockUser } from "@/lib/auth/mock-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Mock API: Received registration request', { email, password: '***' })

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists (using shared storage)
    const existingUser = findMockUser(email)
    if (existingUser) {
      console.log('Mock API: User already exists')
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Mock password validation
    if (password.length < 6) {
      console.log('Mock API: Password too short')
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Create mock user (using shared storage)
    const newUser = addMockUser({
      id: Date.now().toString(),
      email,
      password, // Store plain text for testing (in real app, this would be hashed)
      name: email.split('@')[0],
    })

    console.log('Mock API: User created successfully', { 
      id: newUser.id, 
      email: newUser.email,
      passwordStored: '***'
    })

    // Mock successful response
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Mock API: Registration error", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}