// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, addDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'
import { Bookmark } from '../bookmarkSlice'
import { addBookmarkCategory } from '../../categories/thunks/addBookmarkCategory'

type Payload = { bookmark: Bookmark; categoryId: string }
export const addBookmark = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async (newBookmark, { dispatch, getState }) => {
  const { categoryId, bookmark } = newBookmark
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    const doc = await addDoc(
      collection(db, 'users', uid, 'bookmarks'),
      bookmark
    )
    dispatch(addBookmarkCategory({ id: categoryId, bookmark: doc.id }))
  } catch (error) {
    console.log('got an error: ', error)
  }
})
