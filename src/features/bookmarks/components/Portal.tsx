// react
import { FC } from 'react'
import { createPortal } from 'react-dom'

// modules
// project files
import Form from './Form'

// types
import type { FormData } from './Form'

type Props = {
  data: FormData
  isOpen: boolean
  onClose: (state: boolean) => void
}
const Portal: FC<Props> = ({ data, isOpen, onClose }) => {
  const modalElement = document.getElementById('modal')
  if (!modalElement) return null
  if (!isOpen) return null

  return createPortal(<Form onClose={onClose} data={data} />, modalElement)
}

export default Portal
