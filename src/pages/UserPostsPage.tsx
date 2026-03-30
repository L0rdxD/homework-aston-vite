import { Link, useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useGetUserPostsQuery } from '../entities/post/api/postsApi'
import UserTabs from '../widgets/UserTabs/UserTabs'
import ItemList from '../shared/ui/ItemList'

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>()
  useGetUserByIdQuery(id ?? '', { skip: !id })
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
      <ItemList
        items={posts}
        getKey={(post) => post.id}
        renderItem={(post) => <Link to={`/posts/${post.id}`}>{post.title}</Link>}
      />
    </section>
  )
}
