// react
import { FC, useState } from 'react'

// modules
// project files
import { useSelector } from '../../../hooks/useRedux'
import Bookmark from '../../bookmarks'
import Portal from '../../bookmarks/components/Portal'
import CardHeader from './CardHeader'

type Props = { id: string; tabTitle: string }
const Category: FC<Props> = ({ id, tabTitle }) => {
  const { [id]: thisCategory } = useSelector((state) => state.categories)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const addBookmark = () => setIsModalOpen(true)
  return (
    <div className='card'>
      <CardHeader id={id} title={thisCategory.title} />
      <div className='card-body'>
        <div className='bookmark-links'>
          {thisCategory.bookmarks.map((bookmarkId) => (
            <Bookmark categoryId={id} id={bookmarkId} key={bookmarkId} />
          ))}
        </div>
        <button onClick={addBookmark}>Add Bookmark</button>
        <Portal
          data={{
            categoryId: id,
            categoryTitle: thisCategory.title,
            tabTitle,
          }}
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          type='new'
        />
      </div>
    </div>
  )
}

export default Category
