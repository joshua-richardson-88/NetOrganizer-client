// react
import { FC, useState } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../../hooks/useRedux'
import { updateActiveTab, updateTabTitle } from '../tabSlice'
import TitleInput from '../../../components/TitleInput'

type Props = { id: string; inEditMode: boolean; position: number }
const Tab: FC<Props> = ({ id, inEditMode, position }) => {
  const dispatch = useDispatch()
  const {
    activeTab,
    list: { [id]: thisTab },
  } = useSelector((state) => state.tabs)

  const [editTab, setEditTab] = useState(false)

  const handleClick = () => {
    if (inEditMode) {
      setEditTab((prev) => !prev)
      return
    }
    dispatch(updateActiveTab({ index: position }))
  }
  const updateTabTitleCb = (newTitle: string) => {
    dispatch(updateTabTitle({ id, newTitle }))
  }

  return (
    <div>
      {editTab ? (
        <TitleInput
          title={thisTab.title}
          setIsEditing={setEditTab}
          updateCb={updateTabTitleCb}
        />
      ) : (
        <h2
          className={
            inEditMode ? 'edit-mode' : activeTab === position ? 'active' : ''
          }
          onClick={handleClick}
        >
          {thisTab.title}
        </h2>
      )}
    </div>
  )
}

export default Tab
