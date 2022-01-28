// react
import { FC } from 'react'

// modules
// project files
import { useSelector } from '../../hooks/useRedux'

type Props = { id: string }
const Bookmark: FC<Props> = ({ id }) => {
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)

  return (
    <div className='row'>
      <img
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${thisBookmark.url}`}
        alt={`Favicon for ${thisBookmark.url}`}
      />
      <a href={thisBookmark.url} target='_blank' rel='noreferrer'>
        {thisBookmark.title}
      </a>
    </div>
  )
}

export default Bookmark
