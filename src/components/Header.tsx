// react
// modules
// project files
// types

import useMediaQuery from '../hooks/useMediaQuery'
import { MobileHeader } from './MobileHeader'
import DesktopHeader from './TabletHeader'

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 420px)')

  if (isSmallScreen) return <MobileHeader />
  return <DesktopHeader />
}

export default Header
