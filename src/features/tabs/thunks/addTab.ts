// // modules
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
// import { getAuth } from 'firebase/auth'

// // project files
// import { db } from '../../../utils/firebase/firebase'

// // types

// const addTab = createAsyncThunk('tabs/addTabToFirestore', async () => {
//   const auth = getAuth()
//   const user = auth.currentUser

//   if (!user) throw new Error('No user signed in')

//   const tabsRef = doc(db, user.uid, 'tabs')
//   const docSnap = await getDoc(tabsRef)

//   // create all the data if there are no tabs for this user
//   if (!docSnap.exists()) {
//     const data = {
//       tabs: { list: {}, order: [] },
//       categories: {},
//       bookmarks: {},
//     }
//   }
//   // the typical use case, tabs exist - add the new tab
// })

// /*
// DATA

// collection 'Users'
// [user.uid]: {
//   tabs: {
//     list: {
//       [tabId: string]: {
//         title: string
//         categories: string[] // the id of the categories
//       }
//     } // the actual tab elements
//     order: string[] // the order to render the tabs, defined using the tabId
//   }
//   categories: {
//     title: string
//     bookmarks: string[]
//   }
//   bookmarks: {
//     [bookmarkId: string]: {
//       activity: { what: string, when: Date }[]
//       notes: string
//       tags: string[] // the tags (based on tagId) attached to bookmark
//       title: string
//       url: string
//     }
//   }
// }
// */
