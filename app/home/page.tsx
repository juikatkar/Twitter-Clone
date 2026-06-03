import TweetCard from "../components/TweetCard"
import TweetComposer from "../components/TweetComposer"
import HomePageNavBar from "../components/HomeNavbar"

async function getTweets() {
  const res = await fetch("http://localhost:3000/api/tweets", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tweets")
  }

  return res.json()
}

export default async function HomePage() {
  const tweets = await getTweets()

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6 md:p-8">
      <HomePageNavBar />
      <div className="mx-auto max-w-5xl">
        <TweetComposer />

        <div className="mt-10 space-y-6">
          {tweets.map((tweet: any) => (
            <TweetCard key={tweet._id} post={tweet} />
          ))}
          {tweets.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center text-xl text-gray-500 shadow-sm">
              No tweets yet. Create your first tweet 🚀
            </div>
          )}
        </div>
      </div>
    </main>
  )
}