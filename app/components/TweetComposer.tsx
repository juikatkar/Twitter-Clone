import Link from "next/link"

export default function TweetComposer() {
  return (
    <div className="rounded-3xl bg-white shadow-sm">
      <div className="p-8">
        <div className="flex items-start gap-5">
          {/* <div className="h-5 w-5 shrink-0 rounded-full  bg-orange-500" /> */}

          <h1 className="pt-4 text-2xl text-orange-500">
            What&apos;s happening?
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-6">
        <div className="flex gap-6 text-3xl text-orange-500">
          <span>🖼️</span>
          <span>📰</span>
          <span>😊</span>
        </div>

        <Link
          href="/post-tweet"
          className="rounded-2xl bg-orange-500 px-8 py-3 text-2xl font-semibold text-white transition hover:bg-orange-600"
        >
          Tweet
        </Link>
      </div>
    </div>
  )
}