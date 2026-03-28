import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from '../../../entities/post/api/postsApi'
import { commentsApi } from '../../../entities/comment/api/commentsApi'
import { albumsApi } from '../../../entities/album/api/albumsApi'
import { todosApi } from '../../../entities/todo/api/todosApi'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      commentsApi.middleware,
      albumsApi.middleware,
      todosApi.middleware,
    ),
})

export type { RootState } from './rootReducer'
export type AppDispatch = typeof store.dispatch
