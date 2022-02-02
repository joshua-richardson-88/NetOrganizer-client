// react
import { FC, useState } from 'react'

// modules
// project files
import './index.css'
import CardHeader from './CardHeader'
import Bookmark from '../../bookmarks'
import Portal from '../../bookmarks/components/Portal'
import { useSelector } from '../../../hooks/useRedux'

type Props = { id: string; tabId: string; tabTitle: string }
const Category: FC<Props> = ({ id, tabId, tabTitle }) => {
  const { [id]: thisCategory } = useSelector((state) => state.categories)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const addBookmark = () => setIsModalOpen(true)

  if (!thisCategory) return null

  return (
    <div className='card'>
      <CardHeader id={id} tabId={tabId} title={thisCategory.title} />
      <div className='card-body'>
        <div className='bookmark-container'>
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
