// react
import React, { FC, useState } from 'react'
import { useDispatch } from '../../../hooks/useRedux'
import { updateBookmark } from '../bookmarkSlice'

// modules
// project files

export type UpdateFormData = {
  id: string
  notes: string
  title: string
  url: string
}
type Props = { data: UpdateFormData; onClose: (state: boolean) => void }
const UpdateBookmarkForm: FC<Props> = ({
  data: { id, notes, title, url },
  onClose,
}) => {
  const dispatch = useDispatch()
  const [inputTitle, setTitle] = useState(title)
  const [inputUrl, setUrl] = useState(url)
  const [inputNotes, setNotes] = useState(notes)

  const handleClose = () => onClose(false)
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget
    switch (id) {
      case 'title':
        setTitle(value)
        break
      case 'url':
        setUrl(value)
        break
      case 'notes':
        setNotes(value)
        break
      default:
        return
    }
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!inputTitle) return
    if (!inputUrl) return
    if (inputNotes !== notes) {
      dispatch(
        updateBookmark({ bookmarkId: id, key: 'notes', value: inputNotes })
      )
    }
    if (inputTitle !== title) {
      dispatch(
        updateBookmark({ bookmarkId: id, key: 'title', value: inputTitle })
      )
    }
    if (inputUrl !== url) {
      dispatch(updateBookmark({ bookmarkId: id, key: 'url', value: inputUrl }))
    }
    setTitle('')
    setUrl('')
    setNotes('')
    onClose(false)
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal-backdrop' />
      <div className='modal'>
        <div className='header'>
          <h4>Add A New Bookmark</h4>
          <button onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <label htmlFor='title'>Title</label>
            <input
              autoComplete='off'
              autoFocus
              id='title'
              onChange={handleUpdate}
              type='text'
              value={inputTitle}
            />
          </div>
          <div className='row'>
            <label htmlFor='url'>Link URL</label>
            <input
              autoComplete='off'
              id='url'
              onChange={handleUpdate}
              type='text'
              value={inputUrl}
            />
          </div>
          <div className='row'>
            <label htmlFor='notes'>Notes</label>
            <input
              autoComplete='off'
              id='notes'
              onChange={handleUpdate}
              type='text'
              value={inputNotes}
            />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookmarkForm
