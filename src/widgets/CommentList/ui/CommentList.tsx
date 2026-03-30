import { useCallback, useState, type MouseEventHandler } from 'react'
import styles from './CommentList.module.css'
import type { Comment } from '../../../entities/comment/model/types'

export type { Comment }

type CommentListProps = {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  const [isOpen, setIsOpen] = useState(false)

  const commentsCount = comments.length

  const handleToggle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const renderComment = useCallback((comment: Comment) => {
    return (
      <li key={comment.id} className="comment-list__item">
        <p className="comment-list__author">{comment.name}</p>
        <p className="comment-list__body">{comment.body}</p>
      </li>
    )
  }, [])

  return (
    <div className={styles['comment-list']} aria-label="Comments">
      <button
        type="button"
        className={styles['comment-list__toggle']}
        onClick={handleToggle}
      >
        {isOpen ? 'Hide comments' : `Show comments (${commentsCount})`}
      </button>

      {isOpen && (
        <ul className={styles['comment-list__list']}>
          {comments.map(renderComment)}
        </ul>
      )}
    </div>
  )
}

