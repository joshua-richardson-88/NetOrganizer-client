// react
import { useState } from 'react'

// types
import type { MutableRefObject } from 'react'
import useEventListener from './useEventListener'

export default function useHover(ref: MutableRefObject<any>) {
  const [hovered, setHovered] = useState(false)

  useEventListener('mouseover', () => setHovered(true), ref.current)
  useEventListener('mouseout', () => setHovered(false), ref.current)

  return hovered
}

// example
/*
import { useRef } from 'react' // eslint-disable-line
const HoverComponent = () => {
  const element = useRef(null)
  const hovered = useHover(element)

  return (
    <div 
      ref={element}
      style={{
        backgroundColor: hovered ? 'blue' : 'red'
      }}
    />
  )
}
*/
