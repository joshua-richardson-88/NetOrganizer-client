// react
import { FC, useState } from 'react'

// modules
// project files
import { useSelector } from '../../../hooks/useRedux'
import Bookmark from '../../bookmarks'
import Portal from '../../bookmarks/components/Portal'
import CardHeader from './CardHeader'

type Props = { count: number; id: string; position: number; tabTitle: string }
const Category: FC<Props> = ({ count, id, position, tabTitle }) => {
  const { [id]: thisCategory } = useSelector((state) => state.categories)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const addBookmark = () => setIsModalOpen(true)
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
        <Portal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          data={{
            categoryId: id,
            categoryTitle: thisCategory.title,
            count,
            position,
            tabTitle,
          }}
        />
      </div>
    </div>
  )
}

export default Category
