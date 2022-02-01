// modules
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// project files
import firebaseApp from './initializeApp'

// types

// Firestore
export const db = getFirestore()
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(firebaseApp)
