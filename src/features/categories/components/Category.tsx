// react
import { FC } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../../hooks/useRedux'
import Bookmark from '../../bookmarks'
import { createBookmark } from '../../bookmarks/bookmarkSlice'
import CardHeader from './CardHeader'

type Props = { count: number; id: string; position: number; tabTitle: string }
const Category: FC<Props> = ({ count, id, position, tabTitle }) => {
  const dispatch = useDispatch()
  const { [id]: thisCategory } = useSelector((state) => state.categories)

  const addBookmark = () => {
    const newBookmark = {
      categoryId: id,
      categoryTitle: thisCategory.title,
      tabTitle,
      newTitle: 'New Bookmark',
      notes: '',
      tags: [],
      url: '#',
    }
    dispatch(createBookmark(newBookmark))
  }
  return (
    <div className='card'>
      <CardHeader id={id} title={thisCategory.title} />
      <div className='card-body'>
        <div className='bookmark-links'>
          {thisCategory.bookmarks.map((bookmarkId) => (
            <Bookmark key={bookmarkId} id={bookmarkId} />
          ))}
        </div>
        <button onClick={addBookmark}>Add Bookmark</button>
      </div>
    </div>
  )
}

export default Category
