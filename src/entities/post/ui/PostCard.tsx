import styles from './PostCard.module.css'
import type { Post } from '../model/types'

export type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles['post-card']}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  )
}