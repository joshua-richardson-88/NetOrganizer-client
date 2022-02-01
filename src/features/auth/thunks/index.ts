// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

// project files
import firebaseApp from '../../../utils/firebase/initializeApp'

export const userSignIn = createAsyncThunk('user/signIn', async () => {
  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)

  const { user } = await signInWithPopup(auth, googleProvider)
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    status: 'succeeded',
  }
})
export const userSignOut = createAsyncThunk('user/signOut', async () => {
  const auth = getAuth(firebaseApp)
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
})
