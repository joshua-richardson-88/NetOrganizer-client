// react
import { FC, useState } from 'react'

// modules
// project files
import { ReactComponent as EditIcon } from '../../../assets/editIcon.svg'
import { ReactComponent as OpenAllLinks } from '../../../assets/externalLink.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/deleteIcon.svg'
import { useDispatch, useSelector } from '../../../hooks/useRedux'
import CardTitle from './CardTitle'
import { deleteBookmark } from '../../bookmarks/bookmarkSlice'
import { deleteCategory } from '../categorySlice'

type Props = { id: string; tabId: string; title: string }
const CardHeader: FC<Props> = ({ id, tabId, title }) => {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state) => state.bookmarks)
  const { [id]: thisCategory } = useSelector((state) => state.categories)
  const [showEditButton, setShowEditButton] = useState(false)
  const [inEditMode, setInEditMode] = useState(false)

  const handleMouseOver = () => setShowEditButton(true)
  const handleMouseOut = () => setShowEditButton(false)
  const toggleEditMode = () => setInEditMode((prev) => !prev)
  const openAllLinks = () => {
    thisCategory.bookmarks.forEach((bookmark) => {
      const { url } = bookmarks[bookmark]
      window.open(url, '_blank')
    })
  }
  const handleDeleteCategoryClick = () => {
    thisCategory.bookmarks.forEach((bookmark) => {
      dispatch(deleteBookmark({ bookmarkId: bookmark, categoryId: id }))
    })
    dispatch(deleteCategory({ categoryId: id, tabId: tabId }))
  }

  return (
    <div
      className='card-header'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <CardTitle id={id} inEditMode={inEditMode} title={title} />
      {showEditButton && (
        <>
          <button
            className={inEditMode ? 'edit-button active' : 'edit-button'}
            onClick={toggleEditMode}
          >
            <EditIcon />
          </button>
          {inEditMode ? (
            <button
              className='button-right'
              onClick={handleDeleteCategoryClick}
            >
              <DeleteIcon />
            </button>
          ) : (
            <button className='button-right' onClick={openAllLinks}>
              <OpenAllLinks />
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default CardHeader
