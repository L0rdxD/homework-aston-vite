import { Link, useParams } from 'react-router-dom'
import { useGetUserAlbumsQuery } from '../shared/api/jsonplaceholderApi'
import UserTabs from '../widgets/UserTabs/UserTabs'

export default function UserAlbumsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: albums = [], isLoading, isError } = useGetUserAlbumsQuery(id ?? '', { skip: !id })

  if (!id) {
    return <p role="alert">User id is required.</p>
  }

  return (
    <section>
      <h2>User {id} albums</h2>
      <UserTabs userId={id} />
      {isLoading ? <p>Loading albums...</p> : null}
      {isError ? <p role="alert">Failed to load albums.</p> : null}
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}/photos`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
