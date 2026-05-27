import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/app/lib/mongodb"
import User from "@/app/models/User"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { name, username, email, password } = await req.json()

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    )
  }
}