// react
import { useEffect, useRef } from 'react'

// like useEffect, but we don't run the first time
const useLayoutEffect = (callback: () => void, dependecies: any[]) => {
  const firstReferRef = useRef(true)

  useEffect(() => {
    if (firstReferRef.current) {
      firstReferRef.current = false
      return
    }
    return callback()
  }, dependecies) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useLayoutEffect

// example
/*
import { useState } from 'react' // eslint-disable-line
const UpdateExample = () => {
  const [count, setCount] = useState(10)
  useLayoutEffect(() => alert(count), [count])

  const handleClick = () => {
    setCount((c) => c + 1)
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
*/
