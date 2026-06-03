"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import LogoutButton from "./LogoutButton"

export default function HomeNavbar() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    router.push("/login")
    router.refresh()
  }

  return (
    <nav className="mx-auto m-10 flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-white px-8 py-6 shadow-sm md:flex-row md:px-12">
      <Link
        href="/home"
        className="text-4xl font-bold text-orange-600 md:text-5xl transition hover:text-orange-800"
      >
        Let&apos;s Tweet
      </Link>

      <div className="flex flex-wrap items-center gap-6 text-xl font-medium text-orange-500 md:text-2xl">
        <Link
          className="hover:text-orange-600 hover:-translate-y-1 hover:shadow-md "
          href="/home"
        >
          Home
        </Link>

        <Link
          className="hover:text-orange-600 hover:-translate-y-1 hover:shadow-md"
          href="/post-tweet"
        >
          Post Tweet
        </Link>

        <LogoutButton />
      </div>
    </nav>
  )
}
