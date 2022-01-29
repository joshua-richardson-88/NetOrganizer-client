// react
import React, { FC, useRef, useState } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

// modules
// project files

type Props = {
  setIsEditing: (toggle: boolean) => void
  title: string
  updateCb: (text: string) => void
}
const TabInput: FC<Props> = ({ setIsEditing, title, updateCb }) => {
  const [inputText, setInputText] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(inputRef, () => {
    setIsEditing(false)
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value)
  }
  const handleSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateCb(inputText)
      setIsEditing(false)
    }
    if (event.key === 'Esc' || event.key === 'Escape') setIsEditing(false)
  }

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
