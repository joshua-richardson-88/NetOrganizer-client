// react
import { FC } from 'react'

// modules
// project files
import useToggle from '../hooks/useToggle'
import { ReactComponent as DotsVerticalIcon } from '../assets/dotsVerticalIcon.svg'
import './index.css'
import DrawerPortal from './DrawerPortal'

// types

export const MobileHeader: FC = () => {
  const [isMenuOpen, setMenuOpen] = useToggle(false)

  const handleMenuClick = () => setMenuOpen()

  return (
    <header>
      <button className='menu-button' onClick={handleMenuClick}>
        <DotsVerticalIcon />
      </button>
      <h2 className='menu-title-small'>NetOrganizer</h2>
      <DrawerPortal isOpen={isMenuOpen} onClose={setMenuOpen} />
    </header>
  )
}
