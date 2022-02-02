// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, deleteDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

export const deleteTab = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('tabs/deleteTab', async (tabId, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    await deleteDoc(doc(db, 'users', uid, 'tabs', tabId))
  } catch (error) {
    console.log('got an error: ', error)
  }
})
