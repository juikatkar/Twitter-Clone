import Link from "next/link"

export default function PostTweetPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <Link href="/home" className="text-xl text-blue-600 hover:underline">
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-orange-500 md:text-5xl">
          Create Tweet
        </h1>

        <form className="mt-10 space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Tweet title"
            className="w-full rounded-2xl border border-orange-200 p-5 text-xl outline-none focus:border-orange-500 md:text-2xl"
          />

          <textarea
            name="body"
            placeholder="What is happening?"
            rows={8}
            className="w-full rounded-2xl border border-orange-200 p-5 text-xl outline-none focus:border-orange-500 md:text-2xl"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-500 py-5 text-2xl font-bold text-white transition hover:bg-orange-600 md:text-3xl"
          >
            Post Tweet
          </button>
        </form>
      </div>
    </main>
  )
}