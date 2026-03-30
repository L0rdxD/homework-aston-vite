import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { EntityState } from '@reduxjs/toolkit'
import type { Post } from '../types'
import { postsApi } from '../../api/postsApi'

const postsAdapter = createEntityAdapter<Post>()

export type PostEntityState = EntityState<Post, string>

const postSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState() as PostEntityState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(postsApi.endpoints.getPosts.matchFulfilled, (state, action) => {
      postsAdapter.upsertMany(state, action.payload)
    })
    builder.addMatcher(postsApi.endpoints.getPostById.matchFulfilled, (state, action) => {
      postsAdapter.upsertOne(state, action.payload)
    })
    builder.addMatcher(postsApi.endpoints.getUserPosts.matchFulfilled, (state, action) => {
      postsAdapter.upsertMany(state, action.payload)
    })
  },
})

export const { reducer: postReducer } = postSlice

export const postsSelectors = postsAdapter.getSelectors(
  (state: { posts: PostEntityState }) => state.posts,
)
