import Link from "next/link"
import connectDB from "@/app/lib/mongodb"
import Tweet from "@/app/models/Tweet"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function TweetPage({ params }: PageProps) {
  const { id } = await params

  await connectDB()

  const tweet = await Tweet.findById(id).populate(
    "user",
    "name username email"
  )

  if (!tweet) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-2xl font-bold text-orange-500">
            Tweet not found
          </p>

          <Link
            href="/home"
            className="mt-6 inline-block text-xl text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm md:p-10">
        <Link href="/home" className="text-xl text-blue-600 hover:underline">
          ← Back
        </Link>

        <div className="mt-10 flex gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
            {tweet.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              {tweet.user?.name || "Unknown User"}
            </h2>

            <p className="text-xl text-gray-500">
              @{tweet.user?.username || "unknown"}
            </p>
          </div>
        </div>

        <h1 className="mt-10 text-3xl font-bold text-orange-600">
          {tweet.title}
        </h1>

        <p className="mt-8 text-xl leading-10 text-gray-800">
          {tweet.body}
        </p>

        <div className="mt-6 flex items-center justify-between border-t pt-5 text-lg text-gray-500">
          <div className="group flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-2xl">
              ❤️
            </span>

            <span className="font-medium">
              {tweet.likes?.length || 0} Like
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-2xl">
              👁️
            </span>

            <span>
              View
            </span>
          </div>
        </div>
      </article>
    </main>
  )
}