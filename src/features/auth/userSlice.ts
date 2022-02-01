// modules
import { createSlice } from '@reduxjs/toolkit'

// project files
import { userSignIn, userSignOut } from './thunks'
// types

const initialState: User = {
  uid: null,
  email: null,
  displayName: null,
  status: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignIn.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(userSignIn.rejected, (state) => {
      state.status = 'failed'
    })
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      const { uid, email, displayName } = action.payload
      state.uid = uid
      state.email = email
      state.displayName = displayName
      state.status = 'succeeded'
    })
    builder.addCase(userSignOut.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(userSignOut.rejected, (state) => {
      state.uid = null
      state.email = null
      state.displayName = null
      state.status = 'succeeded'
    })
    builder.addCase(userSignOut.fulfilled, (state) => {
      state.uid = null
      state.email = null
      state.displayName = null
      state.status = 'succeeded'
    })
  },
})

export default userSlice.reducer

type UserStatus = 'loading' | 'succeeded' | 'failed'
export interface User {
  uid: string | null
  email: string | null
  displayName: string | null
  status: UserStatus | null
}
