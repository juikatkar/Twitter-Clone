import { NextResponse } from "next/server"
import connectDB from "@/app/lib/mongodb"
import Tweet from "@/app/models/Tweet"

export async function GET() {
  try {
    await connectDB()

    const tweets = await Tweet.find().sort({
      createdAt: -1,
    })

    return NextResponse.json(tweets)
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tweets" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const tweet = await Tweet.create({
      title: body.title,
      body: body.body,
    })

    return NextResponse.json(tweet, {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create tweet" },
      { status: 500 }
    )
  }
}