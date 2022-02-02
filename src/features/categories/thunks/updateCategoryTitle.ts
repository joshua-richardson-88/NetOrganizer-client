// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'
import titleReplacer from '../../../utils/titleReplacer'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { id: string; title: string }
export const updateCategoryTitle = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async ({ id, title }, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()

  if (!uid) return

  try {
    await updateDoc(doc(db, 'users', uid, 'categories', id), {
      title: titleReplacer(title),
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
