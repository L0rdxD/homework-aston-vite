import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post } from '../../entities/post/ui/PostCard'
import type { Comment } from '../../widgets/CommentList/ui/CommentList'

type ApiPost = {
  id: number
  title: string
  body: string
}

type ApiComment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const jsonplaceholderApi = createApi({
  reducerPath: 'jsonplaceholderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (response: ApiPost[]) =>
        response.map((post) => ({
          id: String(post.id),
          title: post.title,
          body: post.body,
        })),
    }),
    getComments: builder.query<Comment[], void>({
      query: () => 'comments',
      transformResponse: (response: ApiComment[]) =>
        response.map((comment) => ({
          id: String(comment.id),
          postId: String(comment.postId),
          name: comment.name,
          email: comment.email,
          body: comment.body,
        })),
    }),
  }),
})

export const { useGetPostsQuery, useGetCommentsQuery } = jsonplaceholderApi

