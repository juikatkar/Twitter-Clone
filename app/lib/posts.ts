import type { Post, PostsResponse } from "../types/post"

const BASE_URL = "https://dummyjson.com/posts"

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(BASE_URL, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  const data: PostsResponse = await res.json()
  return data.posts
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }

  return res.json()
}