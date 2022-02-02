// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'
import { setDefaultData } from './setDefaultData'
import { queryListeners } from '../../auth/thunks'
import { createTab, deleteTab, updateTab } from '../tabSlice'
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../categories/categorySlice'
import {
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from '../../bookmarks/bookmarkSlice'

// types
import type { AppDispatch, RootState } from '../../../app/store'
import type { Bookmark } from '../../bookmarks/bookmarkSlice'

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
          dispatch(deleteCategory({ id }))
        }
      })
    })
    const bookmarkUnsubscribe = onSnapshot(bookmarkQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id
        console.log(change.doc.data())
        const bookmark = change.doc.data() as Bookmark

        if (change.type === 'added') {
          dispatch(createBookmark({ id, ...bookmark }))
        }
        if (change.type === 'modified') {
          dispatch(updateBookmark({ id, ...bookmark }))
        }
        if (change.type === 'removed') {
          dispatch(deleteBookmark({ id }))
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
