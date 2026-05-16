"use client"

export default function ErrorPage({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-orange-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-orange-500">
        Something went wrong
      </h1>

      <button
        onClick={reset}
        className="rounded-2xl bg-orange-500 px-8 py-4 text-xl font-bold text-white hover:bg-orange-600"
      >
        Try again
      </button>
    </main>
  )
}