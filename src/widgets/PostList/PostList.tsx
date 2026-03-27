/* eslint react-refresh/only-export-components: 0 */
import { useCallback, useMemo, useState } from 'react'
import type { Comment } from '../CommentList/ui/CommentList'
import CommentList from '../CommentList/ui/CommentList'
import { type Post } from '../../entities/post/ui/PostCard'
import PostCard from '../../entities/post/ui/PostCard'
import PostLengthFilter from '../../features/PostLengthFilter/ui/PostLengthFilter'
import filterByLength from '../../features/PostLengthFilter/lib/filterByLength'
import withLoading from '../../shared/lib/hoc/withLoading'
import styles from './PostList.module.css'

export type PostListViewProps = {
  posts: Post[]
  comments: Comment[]
}

function PostList({ posts, comments }: PostListViewProps) {
  const [minTitleLength, setMinTitleLength] = useState<number | null>(null)

  const handleChangeMinTitleLength = useCallback((nextValue: number | null) => {
    setMinTitleLength(nextValue)
  }, [])

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, minTitleLength)
  }, [posts, minTitleLength])

  const commentsByPostId = useMemo(() => {
    const map: Record<string, Comment[]> = {}

    for (const comment of comments) {
      const postId = comment.postId
      if (!map[postId]) {
        map[postId] = []
      }
      map[postId].push(comment)
    }

    return map
  }, [comments])

  const renderPostItem = useCallback(
    (post: Post) => {
      const postComments = commentsByPostId[post.id] ?? []

      return (
        <li key={post.id} className={styles.item}>
          <PostCard post={post} />
          <CommentList comments={postComments} />
        </li>
      )
    },
    [commentsByPostId],
  )

  return (
    <section id="posts" className={styles.posts} aria-label="Posts list">
      <h2>Posts</h2>
      <PostLengthFilter minLength={minTitleLength} onChangeMinLength={handleChangeMinTitleLength} />
      <ul className={styles.list}>
        {filteredPosts.map(renderPostItem)}
      </ul>
    </section>
  )
}

export default withLoading(PostList)