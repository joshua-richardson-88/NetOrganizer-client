// react
import { FC, useState } from 'react'

// modules
// project files
import { ReactComponent as EditIcon } from '../../../assets/editIcon.svg'
import { ReactComponent as OpenAllLinks } from '../../../assets/externalLink.svg'
import { useSelector } from '../../../hooks/useRedux'
import CardTitle from './CardTitle'

type Props = { id: string; title: string }
const CardHeader: FC<Props> = ({ id, title }) => {
  const bookmarks = useSelector((state) => state.bookmarks)
  const { [id]: thisCategory } = useSelector((state) => state.categories)
  const [showEditButton, setShowEditButton] = useState(false)
  const [inEditMode, setInEditMode] = useState(false)

  const handleMouseOver = () => setShowEditButton(true)
  const handleMouseOut = () => setShowEditButton(false)
  const toggleEditMode = () => setInEditMode((prev) => !prev)
  const openAllLinks = () => {
    thisCategory.bookmarks.forEach((bookmark) => {
      // TODO: Need to add logic to check for allow-popups from site
      // Modern browsers don't allow multiple opens by default
      // Need to see if I can check if popups allowed, and catch if not
      const { url } = bookmarks[bookmark]
      window.open(url, '_blank')
    })
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
          <button className='edit-button' onClick={toggleEditMode}>
            <EditIcon />
          </button>
          <button className='open-all-button' onClick={openAllLinks}>
            <OpenAllLinks />
          </button>
        </>
      )}
    </div>
  )
}

export default CardHeader
