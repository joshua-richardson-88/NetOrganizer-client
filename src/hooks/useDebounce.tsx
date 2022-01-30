// react
import { useEffect } from 'react'

// project files
import useTimeout from './useTimeout'

// run a callback function after a delay
export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: any[]
) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])

  // disabling warning, as this function should only run on first render, to
  // prevent the timer from triggering before we want it to. If we passed
  // clear() as a dependency, the effect would trigger every time clear changes
  // which we don't want.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, [])
}

// example
/*
import { useState } from 'react' // eslint-disable-line
const DebounceExample = () => {
  const [count, setCount] = useState(10)
  useDebounce(() => alert(count), 1000, [count])

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
