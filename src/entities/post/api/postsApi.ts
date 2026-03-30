import { createApi } from '@reduxjs/toolkit/query/react'
import { jsonPlaceholderBaseQuery } from '../../../shared/api/baseQuery'
import type { Post } from '../model/types'
import type { User } from '../../user/model/types'
import { commentsApi } from '../../comment/api/commentsApi'

type ApiPost = {
  id: number
  title: string
  body: string
}

type ApiUser = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

const mapPost = (post: ApiPost): Post => ({
  id: String(post.id),
  title: post.title,
  body: post.body,
})

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: jsonPlaceholderBaseQuery,
  tagTypes: ['Post', 'UserPosts', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (response: ApiPost[]) => response.map(mapPost),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
      keepUnusedDataFor: 120,
    }),
    getPostById: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`,
      transformResponse: (post: ApiPost) => mapPost(post),
      providesTags: (_result, _error, postId) => [{ type: 'Post' as const, id: postId }],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            commentsApi.util.invalidateTags([{ type: 'Comment', id: `POST_${postId}` }]),
          )
        } catch {
          // ignore
        }
      },
      keepUnusedDataFor: 120,
    }),
    getUserPosts: builder.query<Post[], string>({
      query: (userId) => `users/${userId}/posts`,
      transformResponse: (response: ApiPost[]) => response.map(mapPost),
      providesTags: (result, _error, userId) => [
        { type: 'UserPosts' as const, id: userId },
        ...(result?.map(({ id }) => ({ type: 'Post' as const, id })) ?? []),
      ],
      keepUnusedDataFor: 120,
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `users/${userId}`,
      transformResponse: (user: ApiUser): User => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      }),
      providesTags: (_result, _error, userId) => [{ type: 'User' as const, id: userId }],
      keepUnusedDataFor: 120,
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useGetUserByIdQuery,
} = postsApi
