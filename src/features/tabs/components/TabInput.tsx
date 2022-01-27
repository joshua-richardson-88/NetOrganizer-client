// react
import React, { FC, useRef, useState } from 'react'
import useOutsideClick from '../../../hooks/useOutsideClick'

// modules
// project files
import { useDispatch } from '../../../hooks/useRedux'
import { updateTabTitle } from '../tabSlice'

type Props = {
  setIsEditing: (toggle: boolean) => void
  tabId: string
  title: string
}
const TabInput: FC<Props> = ({ setIsEditing, tabId, title }) => {
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(inputRef, () => {
    console.log('outside click!')
    setIsEditing(false)
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value)
  }
  const handleSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendUpdate()
      setIsEditing(false)
    }
    if (event.key === 'Esc' || event.key === 'Escape') setIsEditing(false)
  }
  const sendUpdate = () =>
    dispatch(updateTabTitle({ id: tabId, newTitle: inputText }))

  return (
    <input
      autoFocus={true}
      onChange={handleChange}
      onKeyDown={handleSubmit}
      placeholder='New Tab'
      ref={inputRef}
      value={inputText}
    />
  )
}

export default TabInput
