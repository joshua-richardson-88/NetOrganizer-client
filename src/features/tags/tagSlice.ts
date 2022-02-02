// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types

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
