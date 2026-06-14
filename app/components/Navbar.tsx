import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-white px-6 py-4 shadow-sm md:flex-row md:px-12">
      <Link
        href="/"
        className="group flex items-center gap-3"
      >
        <span className="text-3xl transition duration-300 group-hover:-translate-y-1 group-hover:rotate-12">
          🕊️
        </span>

        <h1 className="text-lg font-bold text-orange-600 transition duration-300 group-hover:text-orange-500 md:text-4xl">
          Let&apos;s Tweet
        </h1>
      </Link>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/login"
          className="rounded-xl border border-orange-500 px-6 py-3 text-lg font-medium text-orange-500 transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-md md:text-xl"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-xl bg-orange-500 px-6 py-3 text-lg font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg md:text-xl"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}