// react
import { useRef } from 'react'

// useful when you need to store the previous version of a piece of state
const usePrevious = (value: unknown) => {
  const currentRef = useRef(value)
  const previousRef = useRef<any>(null)

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

export default usePrevious

// example
/*
import { useState } from 'react' // eslint-disable-line
const PreviousComponent = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Josh')
  const previousCount = usePrevious(count)

  return (
    <div>
      <div>
        {count} - {previousCount}
      </div>
      <div>{name}</div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setName('John')}>Change Name</button>
    </div>
  )
}
*/
