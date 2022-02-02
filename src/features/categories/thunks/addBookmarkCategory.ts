// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { id: string; bookmark: string }
export const addBookmarkCategory = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async ({ id, bookmark }, { dispatch, getState }) => {
  const {
    auth: { uid },
    categories: {
      [id]: { bookmarks },
    },
  } = getState()

  if (!uid) return

  try {
    await updateDoc(doc(db, 'users', uid, 'categories', id), {
      bookmarks: [...bookmarks, bookmark],
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
