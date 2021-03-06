// react
import { useRef } from 'react'
// modules
// project files
import { useDispatch, useSelector } from '../hooks/useRedux'
import useToggle from '../hooks/useToggle'
import Tab from '../features/tabs'
import { addTab } from '../features/tabs/thunks'
import { userSignOut } from '../features/auth/thunks'

// types
import type { FC } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

type Props = { closeMenu: (state: boolean) => void }
const Drawer: FC<Props> = ({ closeMenu }) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.tabs)

  const [inEditMode, setEditMode] = useToggle(false)

  const handleMenuClick = () => closeMenu(false)
  const handleAdd = () => dispatch(addTab('New Tab'))
  const handleEdit = () => setEditMode()
  const handleLogout = () => dispatch(userSignOut())

  useOutsideClick(drawerRef, () => closeMenu(false))

  return (
    <div className='drawer' ref={drawerRef}>
      <div className='top-row'>
        <button onClick={handleMenuClick}>X</button>
      </div>
      <div className='tab-buttons'>
        <button onClick={handleAdd}>Add Tab</button>
        <button onClick={handleEdit}>
          {inEditMode ? 'Done Editing' : 'Edit Tabs'}
        </button>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <ul className='menu-links'>
        {order.map((tabId, index) => (
          <Tab
            key={tabId}
            id={tabId}
            position={index}
            inEditMode={inEditMode}
          />
        ))}
      </ul>
    </div>
  )
}
export default Drawer
