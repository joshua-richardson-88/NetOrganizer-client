// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { categoryId: string; tabId: string }
export const deleteCategory = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/deleteTab', async ({ categoryId, tabId }, { dispatch, getState }) => {
  const {
    auth: { uid },
    tabs: {
      list: {
        [tabId]: { categories },
      },
    },
  } = getState()

  if (!uid) return

  try {
    await deleteDoc(doc(db, 'users', uid, 'categories', categoryId))
    await updateDoc(doc(db, 'users', uid, 'tabs', tabId), {
      categories: categories.filter((id: string) => id !== categoryId),
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
