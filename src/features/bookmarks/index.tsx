// react
import { FC } from 'react'

// modules
// project files
import { useSelector } from '../../hooks/useRedux'
import BookmarkIcon from './components/BookmarkIcon'

type Props = { id: string }
const Bookmark: FC<Props> = ({ id }) => {
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)

  return (
    <div className='row'>
      <BookmarkIcon url={thisBookmark.url} />
      <a href={thisBookmark.url} target='_blank' rel='noreferrer'>
        {thisBookmark.title}
      </a>
    </div>
  )
}

export default Bookmark
