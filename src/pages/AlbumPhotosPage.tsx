import { useParams } from 'react-router-dom'
import { useGetAlbumPhotosQuery } from '../shared/api/jsonplaceholderApi'

export default function AlbumPhotosPage() {
  const { id } = useParams<{ id: string }>()
  const { data: photos = [], isLoading, isError } = useGetAlbumPhotosQuery(id ?? '', { skip: !id })

  if (!id) {
    return <p role="alert">Album id is required.</p>
  }

  return (
    <section>
      <h2>Album {id} photos</h2>
      {isLoading ? <p>Loading photos...</p> : null}
      {isError ? <p role="alert">Failed to load photos.</p> : null}
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
