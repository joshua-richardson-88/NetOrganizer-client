// react
import { FC } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../hooks/useRedux'
import { ReactComponent as DotsVerticalIcon } from '../../assets/dotsVerticalIcon.svg'
import { createTab } from './tabSlice'
import Tab from './components/Tab'
import './index.css'
import useToggle from '../../hooks/useToggle'

// types

type Props = {}
const Header: FC<Props> = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.tabs)
  const [isEditMode, toggleEditMode] = useToggle(false)
  const [isMenuOpen, toggleMenuOpen] = useToggle(false)

  const handleEditModeClick = () => toggleEditMode()
  const handleMenuClick = () => toggleMenuOpen()
  const addTab = () => dispatch(createTab({ tabTitle: 'New Tab' }))

  return (
    <header>
      <div className='menu-container'>
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
