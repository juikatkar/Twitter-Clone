import Link from "next/link"

export default function TweetComposer() {
  return (
    <div className="rounded-3xl bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <h1 className="pt-2 text-xl font-medium text-orange-500 md:text-xl">
            What's happening?
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-5">
        <div className="flex gap-5 text-2xl text-orange-500">
          <span className="cursor-pointer transition hover:scale-110">
            🖼️
          </span>

          <span className="cursor-pointer transition hover:scale-110">
            📰
          </span>

          <span className="cursor-pointer transition hover:scale-110">
            😊
          </span>
        </div>

        <Link
          href="/post-tweet"
          className="rounded-2xl bg-orange-500 px-6 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-md"
        >
          Tweet
        </Link>
      </div>
    </div>
  )
}