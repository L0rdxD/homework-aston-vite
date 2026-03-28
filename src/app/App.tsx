import { Fragment, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import './App.css'
import PostList from '../widgets/PostList/PostList'
import Button from '../shared/ui/Button/Button'
import Modal from '../shared/ui/Modal'
import { useGetCommentsQuery } from '../entities/comment/api/commentsApi'
import { useGetPostsQuery } from '../entities/post/api/postsApi'

function App() {
  const [count, setCount] = useState(0)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetPostsQuery()
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetCommentsQuery()

  const isDataLoading = isPostsLoading || isCommentsLoading
  const error = isPostsError || isCommentsError ? 'Failed to load data' : null
  const docsLinks = [
    { href: 'https://vite.dev/', label: 'Explore Vite', icon: <img className="logo" src={viteLogo} alt="" /> },
    { href: 'https://react.dev/', label: 'Learn more', icon: <img className="button-icon" src={reactLogo} alt="" /> },
  ]
  const socialLinks = [
    { href: 'https://github.com/vitejs/vite', label: 'GitHub', iconId: 'github-icon' },
    { href: 'https://chat.vite.dev/', label: 'Discord', iconId: 'discord-icon' },
    { href: 'https://x.com/vite_js', label: 'X.com', iconId: 'x-icon' },
    { href: 'https://bsky.app/profile/vite.dev', label: 'Bluesky', iconId: 'bluesky-icon' },
  ]

  const handleOpenAbout = () => setIsAboutOpen(true)
  const handleCloseAbout = () => setIsAboutOpen(false)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Button className="counter" onClick={() => setCount((currentCount) => currentCount + 1)}>
          Count is {count}
        </Button>
        <Button onClick={handleOpenAbout}>О проекте</Button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            {docsLinks.map((link) => (
              <Fragment key={link.href}>
                <li>
                  <a href={link.href} target="_blank">
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            {socialLinks.map((link) => (
              <Fragment key={link.href}>
                <li>
                  <a href={link.href} target="_blank">
                    <svg className="button-icon" role="presentation" aria-hidden="true">
                      <use href={`/icons.svg#${link.iconId}`}></use>
                    </svg>
                    {link.label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      {error ? (
        <p role="alert">
          {error}
        </p>
      ) : null}
      <PostList isLoading={isDataLoading} posts={posts} comments={comments} />

      <Modal isOpen={isAboutOpen} onClose={handleCloseAbout} ariaLabel="О проекте">
        <Modal.Header>О проекте</Modal.Header>
        <Modal.Body>
          <p>
            Это учебный проект на Vite + React с базовой архитектурой и переиспользуемыми UI-компонентами.
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default App
