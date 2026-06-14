"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PostTweetPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create tweet")
      }

      router.push("/home")
      router.refresh()
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 px-5 py-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-7 shadow-xl">
        <Link
          href="/home"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="text-3xl transition duration-300 hover:-translate-y-1 hover:scale-110">
            🕊️
          </div>

          <h1 className="mt-3 text-2xl font-bold text-orange-500">
            Create a Tweet
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Share your thoughts with the TweetSpace community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>

            <input
              type="text"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
            />
          </div>

          <div>

            <textarea
              placeholder="Share your thoughts..."
              rows={6}
              value={body}
              onChange={(e) =>
                setBody(e.target.value)
              }
              className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-3 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md disabled:opacity-50"
          >
            {loading
              ? "Publishing..."
              : "Publish Tweet"}
          </button>
        </form>
      </div>
    </main>
  )
}