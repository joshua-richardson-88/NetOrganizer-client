// react
import { useState } from 'react'

// project files
import useEventListener from './useEventListener'

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })

  return windowSize
}

// example
/*
import { useState } from 'react' // eslint-disable-line
export const WindowSizeExample = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      {width} x {height}
    </div>
  )
}
*/
