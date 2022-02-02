// react
import { FC, useState } from 'react'

// modules
// project files
import Portal from './components/Portal'
import BookmarkIcon from './components/BookmarkIcon'
import { deleteBookmark } from './thunks'
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import { useDispatch, useSelector } from '../../hooks/useRedux'

type Props = {
  categoryId: string
  id: string
}
const Bookmark: FC<Props> = ({ categoryId, id }) => {
  const dispatch = useDispatch()
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)

  const [hovered, setHovered] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const handleMouseOver = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleEditClick = () => setFormOpen(true)
  const handleDeleteClick = () =>
    dispatch(deleteBookmark({ bookmarkId: id, categoryId }))

  if (!thisBookmark) return null

  return (
    <div
      className='row'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className='bookmark-content'>
        <BookmarkIcon url={thisBookmark.url} />
        <a href={thisBookmark.url} target='_blank' rel='noreferrer'>
          {thisBookmark.title}
        </a>
      </div>
      <div className='bookmark-buttons'>
        {hovered && (
          <button onClick={handleEditClick}>
            <EditIcon />
          </button>
        )}
        {hovered && (
          <button onClick={handleDeleteClick}>
            <DeleteIcon />
          </button>
        )}
      </div>
      <Portal
        data={{
          id,
          notes: thisBookmark.notes,
          title: thisBookmark.title,
          url: thisBookmark.url,
        }}
        isOpen={formOpen}
        onClose={setFormOpen}
        type='edit'
      />
    </div>
  )
}

export default Bookmark
