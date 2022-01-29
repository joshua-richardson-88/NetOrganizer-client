// react
import { FC, useState } from 'react'
import TitleInput from '../../../components/TitleInput'
import { useDispatch } from '../../../hooks/useRedux'
import { updateCategoryTitle } from '../categorySlice'

// modules

// project files

type Props = { id: string; inEditMode: boolean; title: string }
const CardTitle: FC<Props> = ({ id, inEditMode, title }) => {
  const dispatch = useDispatch()
  const [editTitle, setEditTitle] = useState(false)

  const handleClick = () => {
    if (inEditMode) setEditTitle(true)
  }
  const updateTitle = (newTitle: string) => {
    dispatch(updateCategoryTitle({ id, newTitle }))
    setEditTitle(false)
  }
  return (
    <div className={inEditMode ? 'card-title editMode' : 'card-title'}>
      {editTitle ? (
        <TitleInput
          setIsEditing={setEditTitle}
          title={title}
          updateCb={updateTitle}
        />
      ) : (
        <h4 onClick={handleClick}>{title}</h4>
      )}
    </div>
  )
}

export default CardTitle
