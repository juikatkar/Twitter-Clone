"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type CommentFormProps = {
  tweetId: string
}

export default function CommentForm({ tweetId }: CommentFormProps) {
  const router = useRouter()
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!text.trim()) {
      alert("Comment cannot be empty")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/tweets/${tweetId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      setText("")
      router.refresh()
    } catch (error) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-4 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500"
      />

      <button
        disabled={loading}
        className="rounded-2xl bg-orange-500 px-8 py-3 text-lg font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Commenting..." : "Comment"}
      </button>
    </form>
  )
}