// react
// modules
// project files
import { ReactComponent as DotsVerticalIcon } from '../assets/dotsVerticalIcon.svg'
import useToggle from '../hooks/useToggle'
import DrawerPortal from './DrawerPortal'
import './index.css'

// types
import type { FC } from 'react'

const Header: FC = () => {
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
export default Header
