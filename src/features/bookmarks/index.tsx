// react
import { FC, useRef } from 'react'

// modules
// project files
import { useSelector } from '../../hooks/useRedux'
import BookmarkIcon from './components/BookmarkIcon'
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import useHover from '../../hooks/useHover'

type Props = { id: string }
const Bookmark: FC<Props> = ({ id }) => {
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)
  const buttonContainer = useRef<HTMLDivElement | null>(null)
  const hovered = useHover(buttonContainer)

  return (
    <div className='row'>
      <div className='bookmark-content'>
        <BookmarkIcon url={thisBookmark.url} />
        <a href={thisBookmark.url} target='_blank' rel='noreferrer'>
          {thisBookmark.title}
        </a>
      </div>
      <div className='bookmark-buttons' ref={buttonContainer}>
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
