// react
import { useState, useEffect } from 'react'
import useEventListener from './useEventListener'

const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
    null
  )

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener('change', (e) => setIsMatch(e.matches), mediaQueryList)

  return isMatch
}

export default useMediaQuery

// example
/*
export const MediaQueryExample = () => {
  const isLarge = useMediaQuery('(min-width: 200px)')

  return <div>Large: {isLarge.toString()}</div>
}
*/
