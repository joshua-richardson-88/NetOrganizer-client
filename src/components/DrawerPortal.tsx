// react
// modules
import { createPortal } from 'react-dom'

// project files
import Drawer from './Drawer'

// types
import type { FC } from 'react'

type Props = { isOpen: boolean; onClose: () => void }
const DrawerPortal: FC<Props> = ({ isOpen, onClose }) => {
  const modalElement = document.getElementById('modal')
  if (!modalElement) return null
  if (!isOpen) return null

  return createPortal(<Drawer closeMenu={onClose} />, modalElement)
}

export default DrawerPortal
