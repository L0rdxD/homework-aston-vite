import { combineReducers } from '@reduxjs/toolkit'
import { postsApi } from '../../../entities/post/api/postsApi'
import { commentsApi } from '../../../entities/comment/api/commentsApi'
import { albumsApi } from '../../../entities/album/api/albumsApi'
import { todosApi } from '../../../entities/todo/api/todosApi'
import { postReducer } from '../../../entities/post/model/slice/postSlice'
import { userReducer } from '../../../entities/user/model/slice/userSlice'

export const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
  [todosApi.reducerPath]: todosApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
