// react
import { useEffect, useRef } from 'react'

// types
import type { MutableRefObject } from 'react'

export default function useOutsideClick(
  element: MutableRefObject<any>,
  callback: () => void
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath())

      if (!path.includes(element.current)) callbackRef.current()
    }

    document.addEventListener('click', handler)

    return () => document.removeEventListener('click', handler)
  }, [callbackRef, element])
}
