// react
import { useEffect } from 'react'

const useEffectOnce = (cb: () => void) => {
  useEffect(cb, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useEffectOnce

// example
/*
import { useState } from 'react' // eslint-disable-line
export const SizeExample = () => {
  const [count, setCount] = useState(0)

  useEffectOnce(() => alert('Hi'))

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </>
  )
}
*/
