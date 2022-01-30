// project files
import useEventListener from './useEventListener'
import useTimeout from './useTimeout'
import useEffectOnce from './useEffectOnce'

// types
import { MutableRefObject } from 'react'

export default function useLongPress(
  ref: MutableRefObject<any>,
  callback: () => void,
  { delay = 250 } = {}
) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffectOnce(clear)

  useEventListener('mousedown', reset, ref.current)
  useEventListener('touchstart', reset, ref.current)
  useEventListener('mouseup', clear, ref.current)
  useEventListener('mouseleave', clear, ref.current)
  useEventListener('touchend', clear, ref.current)
}

// example
/*
import { useRef } from 'react' // eslint-disable-line

const LongPressComponent = () => {
  const element = useRef(null)
  useLongPress(element, () => alert('Long Press'))

  return (
    <div
      ref={element}
      style={{
        backgroundColor: 'red',
        width: '100px',
        height: '100px',
        position: 'absolute',
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 50px)',
      }}
    />
  )
}
*/
