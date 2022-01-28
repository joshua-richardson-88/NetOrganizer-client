// react
import { FC } from 'react'

// modules
// project files
import { useSelector } from '../../../hooks/useRedux'
import Bookmark from '../../bookmarks'

type Props = { id: string }
const Category: FC<Props> = ({ id }) => {
  const { [id]: thisCategory } = useSelector((state) => state.categories)

  return (
    <div className='card'>
      <div className='card-header'>
        <h4 className='card-title'>{thisCategory.title}</h4>
      </div>
      <div className='card-body'>
        {thisCategory.bookmarks.map((bookmarkId) => (
          <Bookmark key={bookmarkId} id={bookmarkId} />
        ))}
      </div>
    </div>
  )
}

export default Category
