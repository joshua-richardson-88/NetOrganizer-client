// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'
import { setDefaultData } from './setDefaultData'
import { queryListeners } from '../../auth/thunks'

// types
import { AppDispatch, RootState } from '../../../app/store'
import { createTab, deleteTab, updateTab } from '../tabSlice'
import { createCategory, updateCategory } from '../../categories/categorySlice'

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
    // define the collections
    const tabQuery = query(collection(db, 'users', uid, 'tabs'))
    const categoryQuery = query(collection(db, 'users', uid, 'categories'))
    const bookmarkQuery = query(collection(db, 'users', uid, 'bookmarks'))

    // establish the listeners
    const tabUnsubscribe = onSnapshot(tabQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id
        const { title, categories } = change.doc.data()
        const tab = { id, title, categories }

        if (!id || !title || !categories) return

        if (change.type === 'added') {
          dispatch(createTab(tab))
        }
        if (change.type === 'modified') {
          dispatch(updateTab(tab))
        }
        if (change.type === 'removed') {
          dispatch(deleteTab({ id }))
        }
      })
    })
    const categoryUnsubscribe = onSnapshot(categoryQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id
        const { title, bookmarks } = change.doc.data()
        const category = { id, title, bookmarks }

        if (change.type === 'added') {
          dispatch(createCategory(category))
        }
        if (change.type === 'modified') {
          dispatch(updateCategory(category))
        }
        if (change.type === 'removed') {
        }
      })
    })
    const bookmarkUnsubscribe = onSnapshot(bookmarkQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id
        const { title, bookmarks } = change.doc.data()

        if (change.type === 'added') {
        }
        if (change.type === 'modified') {
        }
        if (change.type === 'removed') {
        }
      })
    })

    // store the listener to unsubscribe on logout
    queryListeners.push(
      tabUnsubscribe,
      categoryUnsubscribe,
      bookmarkUnsubscribe
    )
  } catch (error) {
    console.log('got an error: ', error)
  }
})
