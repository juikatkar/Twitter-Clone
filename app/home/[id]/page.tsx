import { getPost } from "../../lib/posts"
import Link from "next/link"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function TweetPage({ params }: PageProps) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm md:p-10">
        <Link href="/home" className="text-xl text-blue-600 hover:underline">
          ← Back
        </Link>

        <div className="mt-10 flex gap-5">
          <div className="mt-2 h-4 w-4 rounded-full bg-orange-500" />

          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              User {post.id}
            </h2>

            <p className="text-xl text-gray-500">
              @user{post.id}
            </p>
          </div>
        </div>

        <h1 className="mt-10 text-3xl font-bold text-orange-500">
          {post.title}
        </h1>

        <p className="mt-8 text-xl leading-10 text-gray-700 md:leading-[3.5rem]">
          {post.body}
        </p>
      </article>
    </main>
  )
}