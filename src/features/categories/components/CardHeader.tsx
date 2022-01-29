// react
import { FC, useState } from 'react'

// modules
// project files
import { ReactComponent as EditIcon } from '../../../assets/editIcon.svg'
import CardTitle from './CardTitle'

type Props = { id: string; title: string }
const CardHeader: FC<Props> = ({ id, title }) => {
  const [showEditButton, setShowEditButton] = useState(false)
  const [inEditMode, setInEditMode] = useState(false)

  const handleMouseOver = () => setShowEditButton(true)
  const handleMouseOut = () => setShowEditButton(false)
  const toggleEditMode = () => setInEditMode((prev) => !prev)

  return (
    <div
      className='card-header'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <CardTitle id={id} inEditMode={inEditMode} title={title} />
      {showEditButton && (
        <button onClick={toggleEditMode}>
          <EditIcon />
        </button>
      )}
    </div>
  )
}

export default CardHeader
