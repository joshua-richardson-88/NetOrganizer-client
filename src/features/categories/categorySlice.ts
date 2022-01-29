// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types
import type {
  CreateBookmarkPayload,
  DeleteBookmarkPayload,
} from '../bookmarks/bookmarkSlice'

const initialState: Categories = {}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: {
      reducer: (state, action: PayloadAction<CreateCategoryPayload>) => {
        const { category, categoryId } = action.payload
        state[categoryId] = category
      },
      prepare: ({ newTitle, tabId }: CreateCategoryInput) => {
        const categoryId = nanoid()
        const title = titleReplacer(newTitle)

        return {
          payload: {
            category: {
              title,
              bookmarks: [],
            },
            categoryId,
            tabId,
          },
        }
      },
    },
    deleteCategory: (state, action: PayloadAction<DeleteCategoryPayload>) => {
      delete state[action.payload.categoryId]
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
    updateCategoryTitle: (
      state,
      action: PayloadAction<UpdateCategoryTitlePayload>
    ) => {
      const { id, newTitle } = action.payload

      state[id].title = titleReplacer(newTitle)
    },
  },
  extraReducers: {
    'bookmarks/createBookmark': (
      state,
      action: PayloadAction<CreateBookmarkPayload>
    ) => {
      const { bookmarkId, categoryId } = action.payload

      state[categoryId].bookmarks.push(bookmarkId)
    },
    'bookmarks/deleteBookmark': (
      state,
      action: PayloadAction<DeleteBookmarkPayload>
    ) => {
      const { bookmarkId, categoryId } = action.payload

      state[categoryId].bookmarks = state[categoryId].bookmarks.filter(
        (id) => id !== bookmarkId
      )
    },
    'tabs/dropAll': (state) => ({}),
  },
})

export default categorySlice.reducer
export const {
  createCategory,
  deleteCategory,
  updateBookmarkOrder,
  updateCategoryTitle,
} = categorySlice.actions
export interface Categories {
  [key: string]: Category
}
export interface Category {
  title: string
  bookmarks: string[]
}
interface CreateCategoryInput {
  newTitle: string
  tabId: string
}
export interface CreateCategoryPayload {
  category: Category
  categoryId: string
  tabId: string
}
export interface DeleteCategoryPayload {
  categoryId: string
  tabId: string
}
interface UpdateCategoryTitlePayload {
  id: string
  newTitle: string
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
