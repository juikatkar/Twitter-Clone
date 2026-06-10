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

    const tweet = await Tweet.findById(id)

    if (!tweet) {
      return NextResponse.json(
        { message: "Tweet not found" },
        { status: 404 }
      )
    }

    const userId = decoded.userId

    const index = tweet.likes.findIndex(
      (like: unknown) => String(like) === userId
    )

    if (index === -1) {
      tweet.likes.push(userId)
    } else {
      tweet.likes.splice(index, 1)
    }

    await tweet.save()

    return NextResponse.json({
      likesCount: tweet.likes.length,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { message: "Failed to like tweet" },
      { status: 500 }
    )
  }
}