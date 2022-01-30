// react
import {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T, SetValue<T>, () => void] {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === 'function') defaultValue()

    return defaultValue
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)

    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.localStorage)
}
export function useSessionStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.sessionStorage)
}

// example
/*
import { useState } from 'react' // eslint-disable-line
const PreviousComponent = () => {
  const [name, setName, removeName] = useSessionStorage('name', 'Josh')
  const [age, setAge, removeAge] = useLocalStorage('age', 26)

  return (
    <div>
      <div>{name} - {age}</div>
      <button onClick={() => setName('John')}>Set Name</button>
      <button onClick={() => setAge(40)}>Set Age</button>
      <button onClick={removeName}>Remove Name</button>
      <button onClick={removeAge}>Remove Age</button>
    </div>
  )
}
*/
