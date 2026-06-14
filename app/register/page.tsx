"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
          }),
        }
      )

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
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <Link
          href="/"
          className="text-xl text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <h1 className="mt-4 text-xl font-bold text-orange-500 md:text-3xl">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500" />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500" />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500" />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500" />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-3 text-xl font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>
      </div>
    </main>
  )
}