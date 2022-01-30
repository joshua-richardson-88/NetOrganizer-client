// react
import { useEffect, useState } from 'react'

export default function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState(defaultValue)

  const clear = () => setArray([])
  const filter = (callback: (element: T) => boolean) => {
    setArray((a) => a.filter(callback))
  }
  const findOne = (callback: (element: T) => boolean) => {
    return {
      element: array.filter(callback)[0],
      index: array.findIndex(callback),
    }
  }
  const move = (from: number, to: number) => {
    if (from < 0 || from > array.length || to < 0 || to > array.length) return
    setArray((a) =>
      a.reduce((newArray, currentItem, currentIndex, originalArray) => {
        if (from === to) newArray.push(currentItem)
        if (currentIndex === from) return newArray
        if (from < to) newArray.push(currentItem)
        if (currentIndex === to) newArray.push(originalArray[from])
        if (from > to) newArray.push(currentItem)

        return newArray
      }, [] as T[])
    )
  }
  const push = (element: T) => {
    setArray((a) => [...a, element])
  }

  const remove = (index: number) => {
    setArray((a) =>
      a.reduce((newArray, currentItem, currentIndex) => {
        if (currentIndex !== index) newArray.push(currentItem)
        return newArray
      }, [] as T[])
    )
  }

  const update = (index: number, updatedElement: T) => {
    setArray((a) =>
      a.reduce((newArray, currentItem, currentIndex) => {
        newArray.push(currentIndex === index ? updatedElement : currentItem)
        return newArray
      }, [] as T[])
    )
  }

  useEffect(() => {
    // console.log('array was updated to: ', array)
  }, [array])

  return {
    array,
    set: setArray,
    clear,
    filter,
    findOne,
    move,
    push,
    remove,
    update,
  }
}

// example
/*
import { useState } from 'react' // eslint-disable-line
const ArrayExample = () => {
  const { array, set, push, remove, filter, update, clear } = useArray([
    1, 2, 3, 4, 5, 6,
  ])

  return (
    <div>
      <div>{array.join(', ')}</div>
      <button onClick={() => push(7)}>Add 7</button>
      <button onClick={() => update(1, 9)}>Change Second Element to 9</button>
      <button onClick={() => remove(1)}>Remove Second Element</button>
      <button onClick={() => filter((n) => n < 3)}>
        Keep Numbers less than 4
      </button>
      <button onClick={() => set([1, 2])}>Set to 1, 2</button>
      <button onClick={clear}>Clear</button>
    </div>
  )
}
*/
