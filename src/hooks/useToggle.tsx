// react
import { useState } from 'react'

const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue)

  const toggleValue = (value?: unknown | undefined) => {
    setValue((currentValue) =>
      typeof value === 'boolean' ? value : !currentValue
    )
  }

  return [value, toggleValue] as const
}

export default useToggle

// example
/*
const ToggleComponent = () => {
  const [value, toggleValue] = useToggle(false)

  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={toggleValue}>Toggle</button>
      <button onClick={toggleValue(true)}>Make True</button>
      <button onClick={toggleValue(false)}>Make False</button>
    </div>
  )
}
*/
