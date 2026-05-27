import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-white px-8 py-6 shadow-sm md:flex-row md:px-12">
      <Link href="/" className="text-4xl font-bold text-orange-600 md:text-5xl">
        Let&apos;s Tweet
      </Link>

      <div className="flex gap-8 text-xl font-medium text-orange-500 md:text-2xl">
        <Link className="hover:text-orange-600" href="/login">
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-2xl bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}