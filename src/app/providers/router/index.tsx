import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from '../../../widgets/LayoutHeader/Header'
import Footer from '../../../widgets/LayoutFooter/Footer'
import AlbumPhotosPage from '../../../pages/AlbumPhotosPage'
import NotFoundPage from '../../../pages/NotFoundPage'
import PostDetailsPage from '../../../pages/PostDetailsPage'
import PostsPage from '../../../pages/PostsPage'
import UserAlbumsPage from '../../../pages/UserAlbumsPage'
import UserPostsPage from '../../../pages/UserPostsPage'
import UserTodosPage from '../../../pages/UserTodosPage'

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Navigate to="/posts" replace /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'posts/:id', element: <PostDetailsPage /> },
      { path: 'users/:id/albums', element: <UserAlbumsPage /> },
      { path: 'albums/:id/photos', element: <AlbumPhotosPage /> },
      { path: 'users/:id/todos', element: <UserTodosPage /> },
      { path: 'users/:id/posts', element: <UserPostsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
