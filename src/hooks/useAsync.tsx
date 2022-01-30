// react
import { useCallback, useEffect, useState } from 'react'

const useAsync = (callback: () => Promise<any>, dependecies: any[] = []) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependecies) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}

export default useAsync

// example
/*
export const AsyncComponent = () => {
  const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = true
      setTimeout(() => {
        success ? resolve('Hi') : reject('Error')
      }, 1000)
    })
  })

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  )
}
*/
