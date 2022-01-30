import { useCallback, useEffect, useRef } from 'react'

const useTimeout = (callback: () => void, delay: number) => {
  // We use a ref here for callbackRef so that it doesn't cause the timeoutRef
  // to re-render when the calling function is re-rendered. Instead the callback
  // reference is simply updated here, and the timer itself remains unaffected.
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear } as const
}

export default useTimeout

//example
/*
import { useState } from 'react' // eslint-disable-line
const TimeoutExample = () => {
  const [count, setCount] = useState(10)
  const { clear, reset } = useTimeout(() => setCount(0), 1000)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={clear}>Clear Timeout</button>
      <button onClick={reset}>Reset Timeout</button>
    </div>
  )
}
*/
