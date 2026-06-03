"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-2xl bg-red-500 px-6 py-3 text-white transition shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:bg-red-600"
    >
      Logout
    </button>
  )
}