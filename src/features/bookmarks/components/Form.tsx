// react
import React, { FC, useState } from 'react'
import { useDispatch } from '../../../hooks/useRedux'
import { createBookmark } from '../bookmarkSlice'

// modules
// project files

export type FormData = {
  categoryId: string
  categoryTitle: string
  tabTitle: string
}
type Props = { data: FormData; onClose: (state: boolean) => void }
const Form: FC<Props> = ({
  data: { categoryId, categoryTitle, tabTitle },
  onClose,
}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')

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
    if (!title) return
    if (!url) return

    const newBookmark = {
      categoryId,
      categoryTitle,
      tabTitle,
      newTitle: title,
      notes,
      tags: [],
      url,
    }
    dispatch(createBookmark(newBookmark))

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
              id='title'
              type='text'
              autoComplete='off'
              value={title}
              onChange={handleUpdate}
            />
          </div>
          <div className='row'>
            <label htmlFor='url'>Link URL</label>
            <input
              id='url'
              type='text'
              autoComplete='off'
              value={url}
              onChange={handleUpdate}
            />
          </div>
          <div className='row'>
            <label htmlFor='notes'>Notes</label>
            <input
              id='notes'
              type='text'
              autoComplete='off'
              value={notes}
              onChange={handleUpdate}
            />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default Form
