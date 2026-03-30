import type { Post } from '../../../entities/post/model/types'

export default function filterByLength(posts: Post[], minLength: number | null): Post[] {
  if (minLength === null) {
    return posts
  }

  const exactLength = Math.max(0, Math.floor(minLength))

  return posts.filter((post) => {
    const titleLength = post.title.length
    return titleLength === exactLength
  })
}

