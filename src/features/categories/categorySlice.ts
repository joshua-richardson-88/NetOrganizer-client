// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// project files
// types

const initialState: Categories = {}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action: PayloadAction<CreateCategoryPayload>) => {
      const { id, ...category } = action.payload
      state[id] = category
    },
    deleteCategory: (state, action: PayloadAction<DeleteCategoryPayload>) => {
      delete state[action.payload.id]
    },
    updateBookmarkOrder: (
      state,
      action: PayloadAction<UpdateBookmarkOrderPayload>
    ) => {
      const {
        bookmark,
        categoryEnd,
        categoryStart,
        destinationIndex,
        sourceIndex,
      } = action.payload
      if (categoryStart === categoryEnd) {
        state[categoryStart.id].bookmarks.splice(sourceIndex, 1)
        state[categoryStart.id].bookmarks.splice(destinationIndex, 1, bookmark)
        return
      }

      state[categoryStart.id].bookmarks.splice(sourceIndex, 1)
      state[categoryEnd.id].bookmarks.splice(destinationIndex, 1, bookmark)
    },
    updateCategory: (state, action: PayloadAction<UpdateCategoryPayload>) => {
      const { id, ...category } = action.payload
      state[id] = category
    },
  },
  extraReducers: {
    'tabs/dropAll': (state) => ({}),
  },
})

export default categorySlice.reducer
export const {
  createCategory,
  deleteCategory,
  updateBookmarkOrder,
  updateCategory,
} = categorySlice.actions
export interface Categories {
  [key: string]: Category
}
export interface Category {
  title: string
  bookmarks: string[]
}
export interface CreateCategoryPayload extends Category {
  id: string
}
export interface DeleteCategoryPayload {
  id: string
}
interface UpdateCategoryPayload extends Category {
  id: string
}
export interface UpdateBookmarkOrderPayload {
  /**
   * @description The id of the bookmark to move
   */
  bookmark: string
  /**
   * @description The id of the category the bookmark moved to
   */
  categoryEnd: {
    id: string
    title: string
  }
  /**
   * @description The id of the category the bookmark moved from
   */
  categoryStart: {
    id: string
    title: string
  }
  /**
   * @description The position in the array to move the bookmark to
   */
  destinationIndex: number
  /**
   * @description The position in the array to move the bookmark from
   */
  sourceIndex: number
}
