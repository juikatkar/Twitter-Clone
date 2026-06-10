import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import connectDB from "@/app/lib/mongodb"
import Tweet from "@/app/models/Tweet"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export async function POST(
  req: Request,
  { params }: PageProps
) {
  try {
    await connectDB()

    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string
    }

    const { id } = await params
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json(
        { message: "Comment cannot be empty" },
        { status: 400 }
      )
    }

    const tweet = await Tweet.findById(id)

    if (!tweet) {
      return NextResponse.json(
        { message: "Tweet not found" },
        { status: 404 }
      )
    }

    tweet.comments.push({
      text,
      user: decoded.userId,
    })

    await tweet.save()

    return NextResponse.json({
      message: "Comment added",
      commentsCount: tweet.comments.length,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add comment" },
      { status: 500 }
    )
  }
}