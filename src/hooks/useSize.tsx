// react
import { useState, useEffect } from 'react'

const useSize = (ref: React.MutableRefObject<any>) => {
  const [size, setSize] = useState<DOMRectReadOnly>(defaultRect)

  useEffect(() => {
    if (ref.current === null) return
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect))
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return size
}

export default useSize

const defaultRect: DOMRectReadOnly = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => '',
}

// example
/*
import { useRef } from 'react' // eslint-disable-line
export const SizeExample = () => {
  const ref = useRef(null)
  const size = useSize(ref)

  return (
    <>
      <div>{JSON.stringify(size)}</div>
      <textarea ref={ref}></textarea>
    </>
  )
}
*/
