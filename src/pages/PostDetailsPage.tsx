import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../shared/api/jsonplaceholderApi'

export default function PostDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id ?? '', { skip: !id })

  if (!id) {
    return <p role="alert">Post id is required.</p>
  }

  if (isLoading) {
    return <p>Loading post...</p>
  }

  if (isError || !post) {
    return <p role="alert">Failed to load post.</p>
  }

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </section>
  )
}
