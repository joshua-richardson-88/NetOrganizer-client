// react
// modules
// project files
import useMediaQuery from '../hooks/useMediaQuery'
import { MobileHeader } from './MobileHeader'
import DesktopHeader from './TabletHeader'

// types

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 425px)')

  if (isSmallScreen) return <MobileHeader />
  return <DesktopHeader />
}

export default Header
