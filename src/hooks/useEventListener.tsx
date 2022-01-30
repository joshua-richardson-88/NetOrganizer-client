// react
import { useEffect, useRef } from 'react'

export default function useEventListener(
  eventType: string,
  callback: (e: any) => void,
  element: any = window
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (e: any) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

// example
/*
import { useState } from 'react' // eslint-disable-line
const EventListenerComponent = () => {
  const [key, setKey] = useState('')
  useEventListener('keydown', (e) => setKey(e.key))

  return <div>Lask key: {key}</div>
}
*/
