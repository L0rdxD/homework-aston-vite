import { useState } from 'react'
import PostList from '../widgets/PostList/PostList'
import usePosts from '../features/PostList/model/hooks/usePosts'
import Button from '../shared/ui/Button/Button'
import Modal from '../shared/ui/Modal'

export default function PostsPage() {
  const [count, setCount] = useState(0)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const { posts, comments, isLoading, error } = usePosts()

  const handleIncrement = () => setCount((currentCount) => currentCount + 1)
  const handleOpenAbout = () => setIsAboutOpen(true)
  const handleCloseAbout = () => setIsAboutOpen(false)

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Button onClick={handleIncrement}>Count is {count}</Button>
        <Button onClick={handleOpenAbout}>О проекте</Button>
      </div>
      <PostList isLoading={isLoading} posts={posts} comments={comments} />

      <Modal isOpen={isAboutOpen} onClose={handleCloseAbout} ariaLabel="О проекте">
        <Modal.Header>О проекте</Modal.Header>
        <Modal.Body>
          <p>Это учебный проект на Vite + React с роутингом, RTK Query и переиспользуемыми UI-компонентами.</p>
        </Modal.Body>
      </Modal>
    </>
  )
}
