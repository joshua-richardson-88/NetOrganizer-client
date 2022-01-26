// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types
import type {
  CreateBookmarkPayload,
  UpdateBookmarkTagPayload,
} from '../bookmarks/bookmarkSlice'

const initialState: Tags = {}

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    createTag: {
      reducer: (state, action: PayloadAction<CreateTagPayload>) => {
        const { id, tag } = action.payload
        state[id] = tag
      },
      prepare: ({ newTitle }: CreateTagInput) => {
        const id = nanoid()
        return {
          payload: {
            id,
            tag: { title: titleReplacer(newTitle), bookmarks: [] },
          },
        }
      },
    },
    deleteTag: (state, action: PayloadAction<DeleteTagPayload>) => {
      const { tagId } = action.payload
      delete state[tagId]
    },
    updateTagTitle: (state, action: PayloadAction<UpdateTagTitlePayload>) => {
      const { id, newTitle } = action.payload
      state[id].title = titleReplacer(newTitle)
    },
  },
  extraReducers: {
    'bookmarks/createBookmark': (
      state,
      action: PayloadAction<CreateBookmarkPayload>
    ) => {
      const {
        bookmarkId,
        bookmark: { tags },
      } = action.payload
      tags.forEach((tagId) => {
        if (typeof state[tagId] === 'object') {
          state[tagId].bookmarks.push(bookmarkId)
        }
      })
    },
    'bookmarks/updateBookmarkTag': (
      state,
      action: PayloadAction<UpdateBookmarkTagPayload>
    ) => {
      const { bookmarkId, tagId } = action.payload

      if (!state[tagId].bookmarks.includes(bookmarkId)) {
        state[tagId].bookmarks.push(bookmarkId)
        return
      }

      state[tagId].bookmarks.filter((id) => id !== bookmarkId)
    },
    'tabs/dropAll': (state) => ({}),
  },
})

export default tagSlice.reducer
export const { createTag, deleteTag, updateTagTitle } = tagSlice.actions
export interface Tags {
  [key: string]: Tag
}
export interface Tag {
  title: string
  bookmarks: string[]
}
interface CreateTagInput {
  bookmarkId: string
  newTitle: string
}
interface CreateTagPayload {
  id: string
  tag: Tag
}
interface DeleteTagPayload {
  tagId: string
}
interface UpdateTagTitlePayload {
  id: string
  newTitle: string
}
