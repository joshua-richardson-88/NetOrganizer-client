// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'
import titleReplacer from '../../../utils/titleReplacer'

// types
import { AppDispatch, RootState } from '../../../app/store'

type Payload = { id: string; key: string; value: string }
export const editBookmark = createAsyncThunk<
  void,
  Payload,
  { dispatch: AppDispatch; state: RootState }
>('tabs/addTab', async ({ id, key, value }, { dispatch, getState }) => {
  console.log('Edit triggered')
  const {
    auth: { uid },
    bookmarks: {
      [id]: { activity },
    },
  } = getState()

  if (!uid) return

  const newValue = key === 'title' ? titleReplacer(value) : value

  const newActivity = {
    what: `Updated ${key} to ${value}`,
    when: Date.now(),
  }

  try {
    await updateDoc(doc(db, 'users', uid, 'bookmarks', id), {
      [key]: newValue,
      activity: [...activity, newActivity],
    })
  } catch (error) {
    console.log('got an error: ', error)
  }
})
