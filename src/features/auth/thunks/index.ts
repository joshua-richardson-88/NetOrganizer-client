// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithPopup, signOut } from 'firebase/auth'

// project files
import { auth, googleProvider } from '../../../utils/firebase/firebase'

// types
import type { Unsubscribe } from 'firebase/firestore'
import { AppDispatch } from '../../../app/store'
import { dropAll } from '../../tabs/tabSlice'

export const queryListeners: Unsubscribe[] = []

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
export const userSignOut = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('user/signOut', async (_, { dispatch }) => {
  try {
    queryListeners.forEach((unsubscribe) => unsubscribe())
    await signOut(auth)
    dispatch(dropAll())
  } catch (error) {
    throw error
  }
})
