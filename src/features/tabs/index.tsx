// react
import { FC, useRef } from 'react'

// modules
// project files
import './index.css'
import { addTab } from './thunks'
import Tab from './components/Tab'
import { userSignOut } from '../auth/thunks'
import { ReactComponent as DotsVerticalIcon } from '../../assets/dotsVerticalIcon.svg'
import { useDispatch, useSelector } from '../../hooks/useRedux'
import useToggle from '../../hooks/useToggle'
import useOutsideClick from '../../hooks/useOutsideClick'

// types

type Props = {}
const Header: FC<Props> = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.tabs)

  const menuRef = useRef(null)
  const [isEditMode, toggleEditMode] = useToggle(false)
  const [isMenuOpen, toggleMenuOpen] = useToggle(false)

  const handleMenuClick = () => toggleMenuOpen()
  const handleEditModeClick = () => {
    toggleEditMode()
    toggleMenuOpen()
  }
  const addNewTab = () => {
    dispatch(addTab('New Tab'))
    toggleMenuOpen()
  }
  const handleSignOut = () => dispatch(userSignOut())

  useOutsideClick(menuRef, () => toggleMenuOpen(false))

  return (
    <header>
      <div className='menu-container' ref={menuRef}>
        <button className='menu-button' onClick={handleMenuClick}>
          <DotsVerticalIcon />
        </button>
        {isMenuOpen && (
          <ul className='menu-links'>
            <li onClick={addNewTab}>Add A Tab</li>
            <li onClick={handleEditModeClick}>
              {isEditMode ? 'Done Editing' : 'Edit Tabs'}
            </li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        )}
      </div>
      <div className='tablist'>
        {order.map((id, index) => (
          <Tab key={id} id={id} position={index} inEditMode={isEditMode} />
        ))}
      </div>
    </header>
  )
}

export default Header
