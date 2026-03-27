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

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

type ApiTodo = {
  id: number
  userId: number
  title: string
  completed: boolean
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
    getPostById: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`,
      transformResponse: (post: ApiPost) => ({
        id: String(post.id),
        title: post.title,
        body: post.body,
      }),
    }),
    getUserAlbums: builder.query<Album[], string>({
      query: (userId) => `users/${userId}/albums`,
      transformResponse: (response: ApiAlbum[]) =>
        response.map((album) => ({
          id: album.id,
          userId: album.userId,
          title: album.title,
        })),
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
    }),
    getUserTodos: builder.query<Todo[], string>({
      query: (userId) => `users/${userId}/todos`,
      transformResponse: (response: ApiTodo[]) =>
        response.map((todo) => ({
          id: todo.id,
          userId: todo.userId,
          title: todo.title,
          completed: todo.completed,
        })),
    }),
    getUserPosts: builder.query<Post[], string>({
      query: (userId) => `users/${userId}/posts`,
      transformResponse: (response: ApiPost[]) =>
        response.map((post) => ({
          id: String(post.id),
          title: post.title,
          body: post.body,
        })),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useGetPostByIdQuery,
  useGetUserAlbumsQuery,
  useGetAlbumPhotosQuery,
  useGetUserTodosQuery,
  useGetUserPostsQuery,
} = jsonplaceholderApi

