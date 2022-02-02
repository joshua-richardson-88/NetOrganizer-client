// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, addDoc } from 'firebase/firestore'

// project files
import { addTabCategory } from '../../tabs/thunks'
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { title: string; tabId: string }
export const addCategory = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async ({ title, tabId }, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    const doc = await addDoc(collection(db, 'users', uid, 'categories'), {
      title,
      bookmarks: [],
    })

    dispatch(addTabCategory({ id: tabId, category: doc.id }))
  } catch (error) {
    console.log('got an error: ', error)
  }
})
