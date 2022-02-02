// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// project files

// types
import type { UpdateBookmarkOrderPayload } from '../categories/categorySlice'

const initialState: Bookmarks = {}

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    createBookmark: (state, action: PayloadAction<CreateBookmarkPayload>) => {
      const { id, ...bookmark } = action.payload
      state[id] = bookmark
    },
    deleteBookmark: (state, action: PayloadAction<DeleteBookmarkPayload>) => {
      delete state[action.payload.id]
    },
    updateBookmark: (state, action: PayloadAction<UpdateBookmarkPayload>) => {
      const { bookmarkId, key, value } = action.payload
      state[bookmarkId] = {
        ...state[bookmarkId],
        [key]: value.trim(),
      }
      state[bookmarkId].activity.push({
        what: `Updated ${key} to ${value}`,
        when: Date.now(),
      })
    },
    updateBookmarkTag: (
      state,
      action: PayloadAction<UpdateBookmarkTagPayload>
    ) => {
      const { bookmarkId, tagId } = action.payload
      // if the tag doesn't exist in the list, add it
      if (!state[bookmarkId].tags.includes(tagId)) {
        state[bookmarkId].tags.push(tagId)
        return
      }
      // otherwise remove it
      state[bookmarkId].tags = state[bookmarkId].tags.filter(
        (tag) => tag !== tagId
      )
    },
  },
  extraReducers: {
    'categories/updateBookmarkOrder': (
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
      const content =
        categoryEnd.id === categoryStart.id
          ? `Changed positions from ${sourceIndex} to ${destinationIndex} in ${categoryStart.title}`
          : `Changed positions from ${sourceIndex} in ${categoryStart.title} to ${destinationIndex} in ${categoryEnd.title}`

      state[bookmark].activity.push({ what: content, when: Date.now() })
    },
    'tabs/dropAll': (state) => ({}),
  },
})

export default bookmarkSlice.reducer
export const {
  createBookmark,
  deleteBookmark,
  updateBookmark,
  updateBookmarkTag,
} = bookmarkSlice.actions
export interface Bookmarks {
  [key: string]: Bookmark
}
export interface Bookmark {
  /**
   * @description User defined notes for this bookmark
   */
  notes: string
  /**
   * @description A list of tag IDs that correspond to this bookmark
   */
  tags: string[]
  /**
   * @description The URL this bookmark points to
   */
  url: string
  /**
   * @description An activity feed of all activity items that have occured to
   *              this bookmark
   */
  activity: Activity[]
  /**
   * @description The text to display for this bookmark
   */
  title: string
}
export interface Activity {
  /**
   * @description The event that occurred
   */
  what: string
  /**
   * @description When the event occurred
   */
  when: number
}
export interface CreateBookmarkPayload extends Bookmark {
  id: string
}
interface UpdateBookmarkPayload {
  bookmarkId: string
  key: 'notes' | 'title' | 'url'
  value: string
}
export interface UpdateBookmarkTagPayload {
  bookmarkId: string
  tagId: string
}
export interface DeleteBookmarkPayload {
  id: string
}
