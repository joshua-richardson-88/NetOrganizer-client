// react
import { FC } from 'react'
import { createPortal } from 'react-dom'

// modules
// project files
import Form from './Form'

const modalElement = document.getElementById('modal')

type Props = { isOpen: boolean; onClose: () => void }
const Portal: FC<Props> = ({ isOpen, onClose }) => {
  if (!modalElement) return null
  if (!isOpen) return null

  return createPortal(<Form />, modalElement)
}

export default Portal
