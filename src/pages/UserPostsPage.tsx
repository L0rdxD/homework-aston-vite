import { Link, useParams } from 'react-router-dom'
import { useGetUserPostsQuery } from '../shared/api/jsonplaceholderApi'
import UserTabs from '../widgets/UserTabs/UserTabs'

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: posts = [], isLoading, isError } = useGetUserPostsQuery(id ?? '', { skip: !id })

  if (!id) {
    return <p role="alert">User id is required.</p>
  }

  return (
    <section>
      <h2>User {id} posts</h2>
      <UserTabs userId={id} />
      {isLoading ? <p>Loading posts...</p> : null}
      {isError ? <p role="alert">Failed to load user posts.</p> : null}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
