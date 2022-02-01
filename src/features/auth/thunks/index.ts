// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithPopup, signOut } from 'firebase/auth'

// project files
import { auth, googleProvider } from '../../../utils/firebase/firebase'

export const userSignIn = createAsyncThunk('user/signIn', async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider)
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      status: 'succeeded',
    }
  } catch (error) {
    throw error
  }
})
export const userSignOut = createAsyncThunk('user/signOut', async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
})
