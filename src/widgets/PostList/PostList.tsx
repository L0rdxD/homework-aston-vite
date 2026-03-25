import type { Post } from '../../entities/post/ui/PostCard'
import PostCard from '../../entities/post/ui/PostCard'

export type PostListProps = {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <section id="posts" aria-label="Posts list">
      <h2>Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-list__item">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}