import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { EntityState } from '@reduxjs/toolkit'
import type { User } from '../types'
import { postsApi } from '../../../post/api/postsApi'

const usersAdapter = createEntityAdapter<User, number>({
  selectId: (user) => user.id,
})

export type UserEntityState = EntityState<User, number>

const userSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState() as UserEntityState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(postsApi.endpoints.getUserById.matchFulfilled, (state, action) => {
      usersAdapter.upsertOne(state, action.payload)
    })
  },
})

export const { reducer: userReducer } = userSlice

export const usersSelectors = usersAdapter.getSelectors(
  (state: { users: UserEntityState }) => state.users,
)
