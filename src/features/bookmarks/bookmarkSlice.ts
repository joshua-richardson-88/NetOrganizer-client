// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types
import type { UpdateBookmarkOrderPayload } from '../categories/categorySlice'

const initialState: Bookmarks = {}

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    createBookmark: {
      reducer: (state, action: PayloadAction<CreateBookmarkPayload>) => {
        const { bookmark, bookmarkId } = action.payload
        state[bookmarkId] = bookmark
      },
      prepare: ({
        categoryId,
        categoryTitle,
        notes,
        tabTitle,
        tags,
        newTitle,
        url,
      }: CreateBookmarkInput) => {
        const id = nanoid()
        const title = titleReplacer(newTitle)

        return {
          payload: {
            categoryId,
            bookmarkId: id,
            bookmark: {
              activity: [
                {
                  what: `Bookmark added to ${categoryTitle} in ${tabTitle}`,
                  when: Date.now(),
                },
              ],
              notes,
              tags,
              title,
              url,
            },
          },
          meta: null,
          error: null,
        }
      },
    },
    deleteBookmark: (state, action: PayloadAction<DeleteBookmarkPayload>) => {
      delete state[action.payload.bookmarkId]
    },
    updateBookmark: (state, action: PayloadAction<UpdateBookmarkPayload>) => {
      const { bookmarkId, key, value } = action.payload
      state[bookmarkId] = {
        ...state[bookmarkId],
        [key]: value.trim(),
      }
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
interface BookmarkBase {
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
}
export interface Bookmark extends BookmarkBase {
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
interface CreateBookmarkInput extends BookmarkBase {
  /**
   * @description The id of the category this bookmark belongs to. Used in
   *              categorySlice extraReducers to add the bookmark to its list
   */
  categoryId: string
  /**
   * @description The title of the category this bookmark belongs to. Used to
   *              generate the activity feed for the create method
   */
  categoryTitle: string
  /**
   * @description The title of the Tab that the category and this bookmark
   *              belongs to. Used to generate the activity feed for the
   *              create method
   */
  tabTitle: string
  /**
   * @description The title of the bookmark the user is creating
   */
  newTitle: string
}
export interface CreateBookmarkPayload {
  bookmarkId: string
  bookmark: Bookmark
  categoryId: string
}
interface UpdateBookmarkPayload {
  bookmarkId: string
  key: 'notes' | 'title'
  value: string
}
export interface UpdateBookmarkTagPayload {
  bookmarkId: string
  tagId: string
}
export interface DeleteBookmarkPayload {
  bookmarkId: string
  categoryId: string
}
