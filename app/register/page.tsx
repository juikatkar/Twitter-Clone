"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      alert("Registration successful")
      router.push("/login")
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
          <div className="text-3xl transition duration-300 hover:-translate-y-1 hover:scale-110">
            🕊️
          </div>

          <h1 className="mt-3 text-2xl font-bold text-orange-500">
            Join TweetSpace
          </h1>

          <p className="mt-2 whitespace-nowrap text-xs text-gray-500">
            Create your account and start sharing your thoughts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:bg-white"
          />

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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}