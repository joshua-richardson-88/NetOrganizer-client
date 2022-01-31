// react
import { FC, useState } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../../hooks/useRedux'
import { updateActiveTab, updateTabTitle } from '../tabSlice'
import TitleInput from '../../../components/TitleInput'
import { deleteBookmark } from '../../bookmarks/bookmarkSlice'
import { deleteCategory } from '../../categories/categorySlice'
import { deleteTab } from '../tabSlice'

type Props = { id: string; inEditMode: boolean; position: number }
const Tab: FC<Props> = ({ id, inEditMode, position }) => {
  const dispatch = useDispatch()
  const {
    activeTab,
    list: { [id]: thisTab },
  } = useSelector((state) => state.tabs)
  const categories = useSelector((state) => state.categories)

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
  const handleDeleteTab = () => {
    if (activeTab === position) {
      dispatch(updateActiveTab({ index: -1 }))
    }
    thisTab.categories.forEach((categoryId) => {
      categories[categoryId].bookmarks.forEach((bookmarkId) => {
        dispatch(deleteBookmark({ bookmarkId, categoryId }))
      })
      dispatch(deleteCategory({ categoryId, tabId: id }))
    })
    dispatch(deleteTab({ id }))
  }

  return (
    <div
      className={
        inEditMode ? 'edit-mode' : activeTab === position ? 'active' : ''
      }
    >
      {editTab ? (
        <TitleInput
          title={thisTab.title}
          setIsEditing={setEditTab}
          updateCb={updateTabTitleCb}
        />
      ) : (
        <h2 onClick={handleClick}>{thisTab.title}</h2>
      )}
      {inEditMode && (
        <span className='delete-tab' onClick={handleDeleteTab}>
          x
        </span>
      )}
    </div>
  )
}

export default Tab
