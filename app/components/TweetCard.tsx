import Link from "next/link"

type TweetCardProps = {
  post: {
    _id: string
    title: string
    body: string
    createdAt?: string
    user?: {
      name: string
      username: string
    }
  }
}

export default function TweetCard({ post }: TweetCardProps) {
  return (
    <Link
      href={`/home/${post._id}`}
      className="block rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
          {post.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-orange-500">
              {post.user?.name || "Unknown User"}
            </h2>

            <span className="text-gray-600">
              @{post.user?.username || "unknown"}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-orange-600">
            {post.title}
          </h3>

          <p className="mt-4 text-lg leading-9 text-gray-800">
            {post.body}
          </p>

          <div className="mt-6 flex items-center justify-between border-t pt-5 text-lg text-gray-500">
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-red-50"
            >
              <span className="text-2xl transition duration-200 group-hover:scale-125 group-hover:drop-shadow-lg active:scale-90">
                ❤️
              </span>

              <span className="font-medium transition group-hover:text-red-500">
                Like
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-blue-50 hover:text-blue-500">
              <span className="text-2xl">👁️</span>

              <span>View</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}