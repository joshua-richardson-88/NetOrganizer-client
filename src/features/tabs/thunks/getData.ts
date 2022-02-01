// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'
import { setDefaultData } from './setDefaultData'
import { queryListeners } from '../../auth/thunks'

// types
import { AppDispatch, RootState } from '../../../app/store'
import { createTab } from '../tabSlice'

export const getData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('tabs/fetchData', async (_, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    const userRef = doc(db, 'users', uid)
    const orderSnapshot = await getDoc(userRef)

    // check if there's no user, and create default data
    if (!orderSnapshot.exists()) {
      dispatch(setDefaultData())
      return
    }

    // const tabs = await getDocs(collection(db, 'users', uid, 'tabs'))
    const tabQuery = query(collection(db, 'users', uid, 'tabs'))
    const unsubscribe = onSnapshot(tabQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const id = change.doc.id
          const { title, categories } = change.doc.data()
          dispatch(createTab({ id, title, categories }))
        }
        if (change.type === 'modified') {
          console.log('Modified tab: ', change.doc.data())
        }
        if (change.type === 'removed') {
          console.log('Removed tab: ', change.doc.data())
        }
      })
    })
    queryListeners.push(unsubscribe)
  } catch (error) {
    console.log('got an error: ', error)
  }
})
