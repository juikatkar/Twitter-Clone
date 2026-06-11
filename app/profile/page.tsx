import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import Link from "next/link"
import connectDB from "@/app/lib/mongodb"
import User from "@/app/models/User"
import Tweet from "@/app/models/Tweet"

type JwtPayload = {
  userId: string
  email: string
}

export default async function ProfilePage() {
  await connectDB()

  const token = (await cookies()).get("token")?.value

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-orange-100">
        <Link
          href="/login"
          className="rounded-2xl bg-orange-500 px-8 py-4 text-xl font-bold text-white"
        >
          Login first
        </Link>
      </main>
    )
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload

  const user = await User.findById(decoded.userId).lean()

  const tweets = await Tweet.find({
    user: decoded.userId,
  })
    .sort({ createdAt: -1 })
    .lean()

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-orange-100">
        <p className="text-2xl font-bold text-orange-500">
          User not found
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/home"
          className="text-xl text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-4xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-orange-500">
                {user.name}
              </h1>

              <p className="mt-1 text-xl text-gray-600">
                @{user.username}
              </p>

              <p className="mt-1 text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <p className="text-3xl font-bold text-orange-500">
                {tweets.length}
              </p>
              <p className="text-gray-600">Tweets</p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <p className="text-3xl font-bold text-orange-500">
                {tweets.reduce(
                  (total: number, tweet: any) =>
                    total + (tweet.likes?.length || 0),
                  0
                )}
              </p>
              <p className="text-gray-600">Likes</p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <p className="text-3xl font-bold text-orange-500">
                {tweets.reduce(
                  (total: number, tweet: any) =>
                    total + (tweet.comments?.length || 0),
                  0
                )}
              </p>
              <p className="text-gray-600">Comments</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-orange-500">
            My Tweets
          </h2>

          <div className="mt-6 space-y-5">
            {tweets.length === 0 && (
              <div className="rounded-3xl bg-white p-8 text-center text-gray-500 shadow-sm">
                You have not created any tweets yet.
              </div>
            )}

            {tweets.map((tweet: any) => (
              <Link
                key={tweet._id.toString()}
                href={`/home/${tweet._id.toString()}`}
                className="block rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-2xl font-bold text-orange-500">
                  {tweet.title}
                </h3>

                <p className="mt-3 text-lg leading-8 text-gray-800">
                  {tweet.body}
                </p>

                <div className="mt-5 flex gap-6 border-t pt-4 text-gray-500">
                  <span>❤️ {tweet.likes?.length || 0}</span>
                  <span>💬 {tweet.comments?.length || 0}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}