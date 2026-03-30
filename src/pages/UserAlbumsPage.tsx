import { Link, useParams } from 'react-router-dom'
import { useGetUserAlbumsQuery } from '../entities/album/api/albumsApi'
import { useGetUserByIdQuery } from '../entities/post/api/postsApi'
import UserTabs from '../widgets/UserTabs/UserTabs'
import ItemList from '../shared/ui/ItemList'

export default function UserAlbumsPage() {
  const { id } = useParams<{ id: string }>()
  useGetUserByIdQuery(id ?? '', { skip: !id })
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
      <ItemList
        items={albums}
        getKey={(album) => album.id}
        renderItem={(album) => <Link to={`/albums/${album.id}/photos`}>{album.title}</Link>}
      />
    </section>
  )
}
