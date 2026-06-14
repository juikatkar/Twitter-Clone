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
          className="rounded-2xl bg-orange-500 px-6 py-3 text-lg font-bold text-white"
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
        <p className="text-xl font-bold text-orange-500">
          User not found
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-5">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/home"
          className="text-base text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-orange-500">
                {user.name}
              </h1>

              <p className="text-base text-gray-600">
                @{user.username}
              </p>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">
                {tweets.length}
              </p>
              <p className="text-sm text-gray-600">
                Tweets
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">
                {tweets.reduce(
                  (total: number, tweet: any) =>
                    total + (tweet.likes?.length || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">
                Likes
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">
                {tweets.reduce(
                  (total: number, tweet: any) =>
                    total +
                    (tweet.comments?.length || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">
                Comments
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-bold text-orange-500">
            My Tweets
          </h2>

          <div className="mt-4 space-y-4">
            {tweets.length === 0 && (
              <div className="rounded-3xl bg-white p-6 text-center text-gray-500 shadow-sm">
                You have not created any tweets yet.
              </div>
            )}

            {tweets.map((tweet: any) => (
              <Link
                key={tweet._id.toString()}
                href={`/home/${tweet._id.toString()}`}
                className="block rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-orange-500">
                  {tweet.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-800">
                  {tweet.body}
                </p>

                <div className="mt-3 flex gap-5 border-t pt-3 text-sm text-gray-500">
                  <span>
                    ❤️ {tweet.likes?.length || 0}
                  </span>

                  <span>
                    💬 {tweet.comments?.length || 0}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}