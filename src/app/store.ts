// modules
import { configureStore } from '@reduxjs/toolkit'

// project files
import bookmarkReducer from '../features/bookmarks/bookmarkSlice'
import categoryReducer from '../features/categories/categorySlice'
import tabReducer from '../features/tabs/tabSlice'
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage'

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    categories: categoryReducer,
    tabs: tabReducer,
  },
  preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
