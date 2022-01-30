// react
import { FC, useState } from 'react'

// modules
// project files
import { useSelector } from '../../hooks/useRedux'
import BookmarkIcon from './components/BookmarkIcon'
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'

type Props = { id: string }
const Bookmark: FC<Props> = ({ id }) => {
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)

  const [hovered, setHovered] = useState(false)

  const handleMouseOver = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

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
          <button>
            <EditIcon />
          </button>
        )}
        {hovered && (
          <button>
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default Bookmark
