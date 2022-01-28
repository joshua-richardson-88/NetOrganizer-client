// react
import { FC } from 'react'
import { useSelector } from '../../../hooks/useRedux'

// modules

// project files

type Props = { id: string }
const Category: FC<Props> = ({ id }) => {
  const { [id]: thisCategory } = useSelector((state) => state.categories)
  const bookmarks = useSelector((state) => state.bookmarks)

  return (
    <div className='card'>
      <div className='card-header'>
        <h4 className='card-title'>{thisCategory.title}</h4>
      </div>
      <div className='card-body'>
        {thisCategory.bookmarks.map((bookmarkId) => (
          <div key={bookmarkId} className='row'>
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmarks[bookmarkId].url}`}
              alt={`Favicon for ${bookmarks[bookmarkId].url}`}
            />
            <a
              href={bookmarks[bookmarkId].url}
              target='_blank'
              rel='noreferrer'
            >
              {bookmarks[bookmarkId].title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
