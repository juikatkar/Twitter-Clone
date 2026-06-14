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
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-5 md:p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <Link
          href="/home"
          className="text-base text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <h1 className="mt-5 text-xl font-bold text-orange-500 md:text-3xl">
          Create Tweet
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            placeholder="Tweet title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-4 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500"
          />

          <textarea
            placeholder="What is happening?"
            rows={6}
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-4 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 text-xl font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading
              ? "Posting..."
              : "Post Tweet"}
          </button>
        </form>
      </div>
    </main>
  )
}