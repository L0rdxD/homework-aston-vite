import { createApi } from '@reduxjs/toolkit/query/react'
import { jsonPlaceholderBaseQuery } from '../../../shared/api/baseQuery'
import type { Todo } from '../model/types'

type ApiTodo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: jsonPlaceholderBaseQuery,
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getUserTodos: builder.query<Todo[], string>({
      query: (userId) => `users/${userId}/todos`,
      transformResponse: (response: ApiTodo[]) =>
        response.map((todo) => ({
          id: todo.id,
          userId: todo.userId,
          title: todo.title,
          completed: todo.completed,
        })),
      providesTags: (result, _error, userId) => [
        { type: 'Todo' as const, id: `USER_${userId}` },
        ...(result?.map(({ id }) => ({ type: 'Todo' as const, id })) ?? []),
      ],
      keepUnusedDataFor: 120,
    }),
  }),
})

export const { useGetUserTodosQuery } = todosApi
