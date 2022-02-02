// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { bookmarkId: string; categoryId: string }
export const deleteBookmark = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>(
  'tabs/deleteTab',
  async ({ bookmarkId, categoryId }, { dispatch, getState }) => {
    const {
      auth: { uid },
      categories: {
        [categoryId]: { bookmarks },
      },
    } = getState()

    if (!uid) return

    try {
      await deleteDoc(doc(db, 'users', uid, 'bookmarks', bookmarkId))
      await updateDoc(doc(db, 'users', uid, 'categories', categoryId), {
        bookmarks: bookmarks.filter((id) => id !== bookmarkId),
      })
    } catch (error) {
      console.log('got an error: ', error)
    }
  }
)
