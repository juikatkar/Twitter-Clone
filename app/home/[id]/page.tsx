export const dynamic = "force-dynamic"

import Link from "next/link"
import connectDB from "@/app/lib/mongodb"
import Tweet from "@/app/models/Tweet"
import CommentForm from "@/app/components/CommentForm"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function TweetPage({ params }: PageProps) {
  const { id } = await params

  await connectDB()

  const tweet = await Tweet.findById(id)
    .populate("user", "name username email")
    .populate("comments.user", "name username")
    .lean()

  if (!tweet) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-xl font-bold text-orange-500">
            Tweet not found
          </p>

          <Link
            href="/home"
            className="mt-4 inline-block text-base text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-5 md:p-6">
      <article className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <Link
          href="/home"
          className="text-base text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <div className="mt-6 flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
            {tweet.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-xl font-bold text-orange-500">
              {tweet.user?.name || "Unknown User"}
            </h2>

            <p className="text-sm text-gray-500">
              @{tweet.user?.username || "unknown"}
            </p>
          </div>
        </div>

        <h1 className="mt-3 text-lg font-bold text-orange-600">
          {tweet.title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          {tweet.body}
        </p>

        <div className="mt-4 border-t pt-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>❤️</span>

            <span>
              {tweet.likes?.length || 0} Likes
            </span>
          </div>
        </div>

        <CommentForm tweetId={String(tweet._id)} />

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold text-orange-500">
            Comments
          </h3>

          <div className="mt-4 space-y-3">
            {tweet.comments.length === 0 && (
              <p className="text-sm text-gray-500">
                No comments yet. Be the first to comment.
              </p>
            )}

            {tweet.comments.map((comment: any) => (
              <div
                key={String(comment._id)}
                className="rounded-2xl bg-orange-50 p-4"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-orange-600">
                    {comment.user?.name || "Unknown User"}
                  </p>

                  <span className="text-xs text-gray-500">
                    @{comment.user?.username || "unknown"}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-800">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}