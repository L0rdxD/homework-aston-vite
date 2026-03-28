import { createApi } from '@reduxjs/toolkit/query/react'
import { jsonPlaceholderBaseQuery } from '../../../shared/api/baseQuery'

export type Album = {
  id: number
  userId: number
  title: string
}

type ApiAlbum = {
  id: number
  userId: number
  title: string
}

export type Photo = {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

type ApiPhoto = {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: jsonPlaceholderBaseQuery,
  tagTypes: ['Album', 'Photo'],
  endpoints: (builder) => ({
    getUserAlbums: builder.query<Album[], string>({
      query: (userId) => `users/${userId}/albums`,
      transformResponse: (response: ApiAlbum[]) =>
        response.map((album) => ({
          id: album.id,
          userId: album.userId,
          title: album.title,
        })),
      providesTags: (result, _error, userId) => [
        { type: 'Album' as const, id: `USER_${userId}` },
        ...(result?.map(({ id }) => ({ type: 'Album' as const, id })) ?? []),
      ],
      keepUnusedDataFor: 120,
    }),
    getAlbumPhotos: builder.query<Photo[], string>({
      query: (albumId) => `albums/${albumId}/photos`,
      transformResponse: (response: ApiPhoto[]) =>
        response.map((photo) => ({
          id: photo.id,
          albumId: photo.albumId,
          title: photo.title,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
        })),
      providesTags: (result, _error, albumId) => [
        { type: 'Photo' as const, id: `ALBUM_${albumId}` },
        ...(result?.map(({ id }) => ({ type: 'Photo' as const, id })) ?? []),
      ],
      keepUnusedDataFor: 120,
    }),
  }),
})

export const { useGetUserAlbumsQuery, useGetAlbumPhotosQuery } = albumsApi
