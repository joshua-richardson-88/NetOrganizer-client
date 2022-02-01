// modules
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

// project files
import { db } from '../../../utils/firebase/firebase'

// types
import type { AppDispatch, RootState } from '../../../app/store'
import { getData } from '.'

export const setDefaultData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('tabs/setDefaultData', async (_, { dispatch, getState }) => {
  const {
    auth: { uid },
  } = getState()
  if (!uid) return
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        tabOrder: [],
      },
      { merge: true }
    )
    const activityDoc = {
      what: 'Default bookmark added',
      when: Date.now(),
    }
    const appleDoc = await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      activity: [activityDoc],
      notes: 'Default Bookmark note',
      tags: [],
      title: 'Apple',
      url: 'https://www.apple.com',
    })
    const bingDoc = await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      activity: [activityDoc],
      notes: 'Default Bookmark note',
      tags: [],
      title: 'Bing',
      url: 'https://www.bing.com',
    })
    const duckDoc = await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      activity: [activityDoc],
      notes: 'Default Bookmark note',
      tags: [],
      title: 'DuckDuckGo',
      url: 'https://www.duckduckgo.com',
    })
    const facebookDoc = await addDoc(
      collection(db, 'users', uid, 'bookmarks'),
      {
        activity: [activityDoc],
        notes: 'Default Bookmark note',
        tags: [],
        title: 'Facebook',
        url: 'https://www.facebook.com',
      }
    )
    const googleDoc = await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      activity: [activityDoc],
      notes: 'Default Bookmark note',
      tags: [],
      title: 'Google',
      url: 'https://www.google.com',
    })
    const twitterDoc = await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      activity: [activityDoc],
      notes: 'Default Bookmark note',
      tags: [],
      title: 'Twitter',
      url: 'https://www.twitter.com',
    })
    const socialDoc = await addDoc(collection(db, 'users', uid, 'categories'), {
      title: 'Social',
      bookmarks: [facebookDoc.id, twitterDoc.id],
    })
    const searchDoc = await addDoc(collection(db, 'users', uid, 'categories'), {
      title: 'Search',
      bookmarks: [bingDoc.id, duckDoc.id, googleDoc.id],
    })
    const techDoc = await addDoc(collection(db, 'users', uid, 'categories'), {
      title: 'Tech',
      bookmarks: [appleDoc.id],
    })
    await addDoc(collection(db, 'users', uid, 'tabs'), {
      title: 'Useful',
      categories: [searchDoc.id],
    })
    await addDoc(collection(db, 'users', uid, 'tabs'), {
      title: 'Maybe Useful',
      categories: [socialDoc.id, techDoc.id],
    })

    dispatch(getData())
  } catch (error) {
    console.log(error)
  }
})
