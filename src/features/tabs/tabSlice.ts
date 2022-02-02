// modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// project files
import titleReplacer from '../../utils/titleReplacer'

// types

const initialState: Tabs = {
  order: [],
  list: {},
  activeTab: 0,
}

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    createTab: (state, action: PayloadAction<CreateTabPayload>) => {
      const { id, ...tab } = action.payload

      if (state.list[id]) return

      state.order.push(id)
      state.list[id] = tab
    },
    addTabOrder: (state, action: PayloadAction<CreateTabOrder>) => {
      state.order = action.payload.order
    },
    deleteTab: (state, action: PayloadAction<DeleteTabPayload>) => {
      const { id } = action.payload
      state.order = state.order.filter((tabId) => id !== tabId)
      delete state.list[id]
    },
    dropAll: (state) => {
      state.order = []
      state.list = {}
    },
    updateActiveTab: (state, action: PayloadAction<UpdateActiveTabPayload>) => {
      state.activeTab = action.payload.index
    },
    updateTab: (state, action: PayloadAction<UpdateTabPayload>) => {
      const { id, ...tab } = action.payload
      state.list[id] = tab
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
})

export default tabSlice.reducer
export const { createTab, deleteTab, dropAll, updateActiveTab, updateTab } =
  tabSlice.actions
export interface Tabs {
  order: string[]
  list: IndexedTabs
  activeTab: number // The currently displayed tab
}
interface IndexedTabs {
  [key: string]: Tab
}
export interface Tab {
  title: string
  categories: string[]
}
interface CreateTabPayload extends Tab {
  id: string
}
interface CreateTabOrder {
  order: string[]
}
export interface DeleteTabPayload {
  id: string
}
interface UpdateActiveTabPayload {
  index: number
}
interface UpdateTabPayload extends Tab {
  id: string
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
