"use client"

import Link from "next/link"
import LogoutButton from "./LogoutButton"

export default function HomeNavbar() {
  return (
    <nav className="mx-auto my-4 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-3xl bg-white px-4 py-3 shadow-sm md:flex-row md:px-10">
      <Link
        href="/home"
        className="group flex items-center gap-3"
      >
        <span className="text-3xl transition duration-300 group-hover:-translate-y-1 group-hover:rotate-12">
          🕊️
        </span>

        <h1 className="text-xl font-bold text-orange-600 transition duration-300 group-hover:text-orange-500 md:text-2xl">
          TweetSpace
        </h1>
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-3 text-base font-medium text-orange-500 md:text-lg">        <Link
        href="/home"
        className="rounded-2xl px-5 py-3 transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md"
      >
        Home
      </Link>

        <Link
          href="/post-tweet"
          className="rounded-2xl px-5 py-3 transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md"
        >
          Post Tweet
        </Link>
        <Link
          href="/profile"
          className="rounded-2xl px-5 py-3 transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md"
        >
          Profile
        </Link>
        <LogoutButton />
      </div>
    </nav>
  )
}