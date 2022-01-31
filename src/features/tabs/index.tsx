// react
import { FC, useRef } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../hooks/useRedux'
import { ReactComponent as DotsVerticalIcon } from '../../assets/dotsVerticalIcon.svg'
import { createTab } from './tabSlice'
import Tab from './components/Tab'
import './index.css'
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
  const addTab = () => {
    dispatch(createTab({ tabTitle: 'New Tab' }))
    toggleMenuOpen()
  }

  useOutsideClick(menuRef, () => toggleMenuOpen(false))

  return (
    <header>
      <div className='menu-container' ref={menuRef}>
        <button className='menu-button' onClick={handleMenuClick}>
          <DotsVerticalIcon />
        </button>
        {isMenuOpen && (
          <ul className='menu-links'>
            <li onClick={addTab}>Add A Tab</li>
            <li onClick={handleEditModeClick}>
              {isEditMode ? 'Done Editing' : 'Edit Tabs'}
            </li>
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
