"use client"

import Link from "next/link"
import { useState } from "react"

type TweetCardProps = {
  post: {
    _id: string
    title: string
    body: string
    createdAt?: string
    likes?: string[]
    comments?: unknown[]
    user?: {
      name: string
      username: string
    }
  }
}

export default function TweetCard({ post }: TweetCardProps) {
  const [likesCount, setLikesCount] = useState(
    post.likes?.length || 0
  )

  async function handleLike(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    e.stopPropagation()

    try {
      const res = await fetch(
        `/api/tweets/${post._id}/like`,
        {
          method: "POST",
        }
      )

      const data = await res.json()

      if (!res.ok) {
        alert(
          data.message ||
          "Failed to like tweet"
        )
        return
      }

      setLikesCount(data.likesCount)
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  return (
    <Link
      href={`/home/${post._id}`}
      className="block rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
          {post.user?.name
            ?.charAt(0)
            .toUpperCase() || "U"}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-orange-500">
                {post.user?.name ||
                  "Unknown User"}
              </h2>

              <span className="text-sm text-gray-500">
                @
                {post.user?.username ||
                  "unknown"}
              </span>
            </div>

            {post.createdAt && (
              <span className="text-xs text-gray-400 sm:ml-auto">
                {new Date(
                  post.createdAt
                ).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
                {" • "}
                {new Date(
                  post.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-md font-semibold text-orange-600">
            {post.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">
            {post.body}
          </p>

          <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm text-gray-500">
            <button
              type="button"
              onClick={handleLike}
              className="group flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-red-50"
            >
              <span className="text-xs transition duration-200 group-hover:scale-125 active:scale-90">
                ❤️
              </span>

              <span className="transition group-hover:text-red-500">
                {likesCount} Like
              </span>
            </button>

            <div className="flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-orange-50 hover:text-orange-500">
              <span className="text-xs">
                💬
              </span>

              <span>
                {post.comments?.length || 0}{" "}
                Comment
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-blue-50 hover:text-blue-500">
              <span className="text-xs">
                👁️
              </span>

              <span>View</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}