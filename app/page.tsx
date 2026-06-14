import Navbar from "../app/components/Navbar"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 px-6 py-6">
      <Navbar />

      <section className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-orange-500 md:text-2xl ">
          About Us
        </h2>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-100">
          <p className="text-left text-base leading-8 text-gray-700 md:text-lg">
            <span className="font-semibold text-orange-500">
              TweetSpace
            </span>{" "}
            is a place where people can share their thoughts, express ideas,
            and connect with others through short posts and conversations.
            <br />
            <br />
            Whether you want to share daily updates, discuss trending topics
            or engage with a community, TweetSpace provides a simple and
            friendly platform to make your voice heard.
            <br />
            <br />
            Join the conversation, discover what others are talking about
            and start sharing your story today.
          </p>
        </div>
      </section>
    </main>
  )
}