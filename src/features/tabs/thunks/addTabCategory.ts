// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { id: string; category: string }
export const addTabCategory = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async ({ id, category }, { dispatch, getState }) => {
  const {
    auth: { uid },
    tabs: {
      list: {
        [id]: { categories },
      },
    },
  } = getState()

  if (!uid) return

  try {
    await updateDoc(doc(db, 'users', uid, 'tabs', id), {
      categories: [...categories, category],
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
