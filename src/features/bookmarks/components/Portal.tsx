// react
import { FC } from 'react'
import { createPortal } from 'react-dom'

// modules
// project files
import './modal.css'
import NewBookmarkForm from './NewBookmarkForm'
import UpdateBookmarkForm from './UpdateBookmarkForm'

// types
import type { FormData } from './NewBookmarkForm'
import type { UpdateFormData } from './UpdateBookmarkForm'

type Props = {
  data: FormData | UpdateFormData
  isOpen: boolean
  onClose: (state: boolean) => void
  type: 'new' | 'edit'
}
const Portal: FC<Props> = ({ data, isOpen, onClose, type }) => {
  const modalElement = document.getElementById('modal')
  if (!modalElement) return null
  if (!isOpen) return null
  if (type === 'new')
    return createPortal(
      <NewBookmarkForm onClose={onClose} data={data as FormData} />,
      modalElement
    )

  return createPortal(
    <UpdateBookmarkForm onClose={onClose} data={data as UpdateFormData} />,
    modalElement
  )
}

export default Portal
