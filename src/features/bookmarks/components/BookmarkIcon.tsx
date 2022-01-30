// react
import { FC, useState } from 'react'

// modules
// project files

import { ReactComponent as DefaultFavicon } from '../../../assets/unknownFavicon.svg'

type Props = { url: string }
const BookmarkIcon: FC<Props> = ({ url }) => {
  const [faviconError, setFaviconError] = useState(false)

  const hasError = () => setFaviconError(true)

  if (faviconError) return <DefaultFavicon />

  return (
    <img
      src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}`}
      alt={`Favicon for ${url}`}
      onError={hasError}
    />
  )
}

export default BookmarkIcon
