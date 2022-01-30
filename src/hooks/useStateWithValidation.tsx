// react
import React, { useCallback, useState } from 'react'

const useStateWithValidation = (
  validationFunction: (stateToCheck: string) => boolean,
  initialValue: string
): [
  string,
  (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void,
  boolean
] => {
  const [state, setState] = useState(initialValue)
  const [isValid, setIsValid] = useState(true)

  const onChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setState(event.target.value)
      setIsValid(validationFunction(event.target.value))
    },
    [validationFunction]
  )

  return [state, onChange, isValid]
}

export default useStateWithValidation

// example
/*
export const StateWithValidationExample = () => {
  const [username, setUsername, isValid] = useStateWithValidation(
    (name) => name.length > 5,
    ''
  )

  return (
    <>
      <div>Valid: {isValid.toString()}</div>
      <input type='text' value={`${username}`} onChange={setUsername} />
    </>
  )
}
*/
