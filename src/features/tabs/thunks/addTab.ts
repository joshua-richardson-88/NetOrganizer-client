// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, addDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

export const addTab = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async (title, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    await addDoc(collection(db, 'users', uid, 'tabs'), {
      title,
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
