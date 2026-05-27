import Link from "next/link"
import TweetCard from "../components/TweetCard"
import TweetComposer from "../components/TweetComposer"
import { getPosts } from "../lib/posts"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <div className="mx-auto max-w-2xl">

        <TweetComposer />

        <div className="mt-10 space-y-6">
          {posts.slice(0, 10).map((post) => (
            <TweetCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}