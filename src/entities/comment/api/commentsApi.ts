import { createApi } from '@reduxjs/toolkit/query/react'
import { jsonPlaceholderBaseQuery } from '../../../shared/api/baseQuery'
import type { Comment } from '../model/types'

type ApiComment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

const mapComment = (comment: ApiComment): Comment => ({
  id: String(comment.id),
  postId: String(comment.postId),
  name: comment.name,
  email: comment.email,
  body: comment.body,
})

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: jsonPlaceholderBaseQuery,
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], void>({
      query: () => 'comments',
      transformResponse: (response: ApiComment[]) => response.map(mapComment),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment' as const, id: 'LIST' },
            ]
          : [{ type: 'Comment' as const, id: 'LIST' }],
      keepUnusedDataFor: 120,
    }),
    getCommentsByPostId: builder.query<Comment[], string>({
      query: (postId) => `posts/${postId}/comments`,
      transformResponse: (response: ApiComment[]) => response.map(mapComment),
      providesTags: (result, _error, postId) => [
        { type: 'Comment' as const, id: `POST_${postId}` },
        ...(result?.map(({ id }) => ({ type: 'Comment' as const, id })) ?? []),
      ],
      keepUnusedDataFor: 120,
    }),
  }),
})

export const { useGetCommentsQuery, useGetCommentsByPostIdQuery } = commentsApi
