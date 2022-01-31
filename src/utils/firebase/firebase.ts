// modules
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// project files
import firebaseApp from './initializeApp'

// types

// Authentication
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider()
export const auth = getAuth(firebaseApp)
export const socialAuthLogin = async (provider: GoogleAuthProvider) => {
  try {
    const auth = getAuth(firebaseApp)
    const data = await signInWithPopup(auth, provider)
    return data.user
  } catch (error) {
    console.log(error)
  }
}
export const socialAuthLogout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
  }
}

// Firestore
export const db = getFirestore()
