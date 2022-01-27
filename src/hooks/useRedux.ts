// modules
import {
  TypedUseSelectorHook,
  useDispatch as defaultUseDispatch,
  useSelector as defaultUseSelector,
} from 'react-redux'

// types
import type { RootState, AppDispatch } from '../app/store'

export const useDispatch = () => defaultUseDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector
