export const dynamic = "force-dynamic"

import HomeNavbar from "../components/HomeNavbar"
import TweetCard from "../components/TweetCard"
import TweetComposer from "../components/TweetComposer"
import connectDB from "../lib/mongodb"
import Tweet from "../models/Tweet"

export default async function HomePage() {
  await connectDB()

  const tweets = await Tweet.find()
    .populate("user", "name username")
    .sort({ createdAt: -1 })
    .lean()

  const formattedTweets = tweets.map((tweet: any) => ({
    _id: tweet._id.toString(),
    title: tweet.title,
    body: tweet.body,
    createdAt: tweet.createdAt?.toISOString(),
    likes: tweet.likes?.map((like: any) => like.toString()) || [],
    comments:
      tweet.comments?.map((comment: any) =>
        comment._id.toString()
      ) || [],
    user: {
      name: tweet.user?.name || "Unknown User",
      username: tweet.user?.username || "unknown",
    },
  }))

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <HomeNavbar />

      <div className="mx-auto mt-10 max-w-4xl">
        <TweetComposer />

        <div className="mt-10 space-y-6">
          {formattedTweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              post={tweet}
            />
          ))}
        </div>
      </div>
    </main>
  )
}