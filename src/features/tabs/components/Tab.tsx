// react
import { FC, useState } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../../hooks/useRedux'
import { updateActiveTab } from '../tabSlice'
import TabInput from './TabInput'

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

  return (
    <div>
      {editTab ? (
        <TabInput tabId={id} title={thisTab.title} setIsEditing={setEditTab} />
      ) : (
        <h2
          className={
            inEditMode ? 'editMode' : activeTab === position ? 'active' : ''
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
