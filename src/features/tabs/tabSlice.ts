// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types
import type {
  CreateCategoryPayload,
  DeleteCategoryPayload,
} from '../categories/categorySlice'

const initialState: Tabs = {
  order: [],
  list: {},
}

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    createTab: {
      reducer: (state, action: PayloadAction<CreateTabPayload>) => {
        const { id, ...tab } = action.payload
        state.order.push(id)
        state.list[id] = tab
      },
      prepare: ({ tabTitle }: CreateTabInput) => {
        const id = nanoid()
        const title = titleReplacer(tabTitle)
        return { payload: { id, title, categories: [] } }
      },
    },
    deleteTab: (state, action: PayloadAction<DeleteTabPayload>) => {
      const { tabId } = action.payload
      state.order = state.order.filter((id) => id !== tabId)
      delete state.list[tabId]
    },
    dropAll: (state) => {
      state.order = []
      state.list = {}
    },
    updateCategoryOrder: (
      state,
      action: PayloadAction<UpdateCategoryOrderPayload>
    ) => {
      const {
        categoryId,
        destinationIndex,
        endTabId,
        sourceIndex,
        startTabId,
      } = action.payload

      if (startTabId === endTabId) {
        state.list[startTabId].categories.splice(sourceIndex, 1)
        state.list[startTabId].categories.splice(
          destinationIndex,
          0,
          categoryId
        )
        return
      }

      state.list[startTabId].categories.splice(sourceIndex, 1)
      state.list[endTabId].categories.splice(destinationIndex, 0, categoryId)
    },
    updateTabOrder: (state, action: PayloadAction<UpdateTabOrderPayload>) => {
      const { destinationIndex, id, sourceIndex } = action.payload
      state.order.splice(sourceIndex, 1)
      state.order.splice(destinationIndex, 0, id)
    },
    updateTabTitle: (state, action: PayloadAction<UpdateTabTitlePayload>) => {
      const { id, newTitle } = action.payload
      state.list[id].title = titleReplacer(newTitle)
    },
  },
  extraReducers: {
    'categories/createCategory': (
      state,
      action: PayloadAction<CreateCategoryPayload>
    ) => {
      const { categoryId, tabId } = action.payload
      state.list[tabId].categories.push(categoryId)
    },
    'categories/deleteCategory': (
      state,
      action: PayloadAction<DeleteCategoryPayload>
    ) => {
      const { categoryId, tabId } = action.payload
      state.list[tabId].categories = state.list[tabId].categories.filter(
        (id) => id !== categoryId
      )
    },
  },
})

export default tabSlice.reducer
export const {
  createTab,
  deleteTab,
  dropAll,
  updateCategoryOrder,
  updateTabOrder,
  updateTabTitle,
} = tabSlice.actions
export interface Tabs {
  order: string[]
  list: IndexedTabs
}
interface IndexedTabs {
  [key: string]: Tab
}
export interface Tab {
  title: string
  categories: string[]
}
interface CreateTabInput {
  tabTitle: string
}
interface CreateTabPayload extends Tab {
  id: string
}
interface DeleteTabPayload {
  tabId: string
}
interface UpdateCategoryOrderPayload {
  categoryId: string
  destinationIndex: number
  endTabId: string
  sourceIndex: number
  startTabId: string
}
interface UpdateTabOrderPayload {
  destinationIndex: number
  id: string
  sourceIndex: number
}
interface UpdateTabTitlePayload {
  id: string
  newTitle: string
}
