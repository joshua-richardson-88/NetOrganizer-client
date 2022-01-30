// react
import { useState, useEffect } from 'react'

const useGeolocation = (options?: PositionOptions) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [data, setData] = useState<GeolocationCoordinates | null>(null)

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false)
      setError(null)
      setData(e.coords)
    }
    const errorHandler = (e: GeolocationPositionError) => {
      setError(e)
      setLoading(false)
    }

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )

    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data }
}

export default useGeolocation

// example
/*
import {} from 'react' // eslint-disable-line
export const GeolocationExample = () => {
  const { loading, error, data } = useGeolocation()

  return (
    <>
      <div>Loading: {loading.toString()}</div>
      <div>Error: {error?.message}</div>
      <div>
        {data?.latitude} x {data?.longitude}
      </div>
    </>
  )
}
*/
