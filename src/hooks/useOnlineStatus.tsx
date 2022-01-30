//react
import { useState } from 'react'

//project files
import useEventListener from './useEventListener'

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine)

  useEventListener('online', () => setOnline(navigator.onLine))
  useEventListener('offline', () => setOnline(navigator.onLine))

  return online
}

// example
/*
const OnlineStatusComponent = () => {
  const online = useOnlineStatus()

  return <div>{online.toString()}</div>
}
*/
