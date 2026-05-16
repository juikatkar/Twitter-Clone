import Link from "next/link"
import type { Post } from "../types/post"

type TweetCardProps = {
  post: Post
}

export default function TweetCard({ post }: TweetCardProps) {
  return (
    <Link
      href={`/home/${post.id}`}
      className="block rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex gap-5">
        <div className="mt-2 h-4 w-4 shrink-0 rounded-full bg-orange-500" />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-orange-500">
              User {post.id}
            </h2>

            <span className="text-gray-500">@user{post.id}</span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-orange-500">
            {post.title}
          </h3>

          <p className="mt-3 text-lg leading-8 text-gray-700">
            {post.body}
          </p>

          <div className="mt-6 flex gap-8 text-gray-500">
            <span>❤️ {post.reactions?.likes ?? 0}</span>
            <span>👁️ {post.views ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}