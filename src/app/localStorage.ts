// types
import defaultState from './defaultState'
import type { RootState } from './store'

const STORAGE_KEY = 'persistantState'
export const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    console.warn(error)
  }
}
export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) return defaultState
    return JSON.parse(serializedState)
  } catch (error) {
    console.warn(error)
    return undefined
  }
}
