// modules
import { configureStore } from '@reduxjs/toolkit'

// project files
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage'
import bookmarkReducer from '../features/bookmarks/bookmarkSlice'
import categoryReducer from '../features/categories/categorySlice'
import tabReducer from '../features/tabs/tabSlice'
import tagReducer from '../features/tags/tagSlice'

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    categories: categoryReducer,
    tabs: tabReducer,
    tags: tagReducer,
  },
  preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
