"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 px-5 py-8">
      <div className="w-full max-w-md rounded-[2rem] bg-white px-7 py-8 shadow-xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="text-4xl transition duration-300 hover:-translate-y-1 hover:scale-110">
            🕊️
          </div>

          <h1 className="mt-3 text-2xl font-bold text-orange-500 md:text-2xl">
            Sign in to TweetSpace
          </h1>

          <p className="mt-2 whitespace-nowrap text-xs text-gray-500">
            Welcome back! Share your thoughts and join the conversation.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-3 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-500 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}