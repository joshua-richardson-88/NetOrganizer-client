// react
import { FC, useState } from 'react'

// modules
// project files
import { useSelector } from '../../hooks/useRedux'

import { ReactComponent as DefaultFavicon } from '../../assets/unknownFavicon.svg'

type Props = { id: string }
const Bookmark: FC<Props> = ({ id }) => {
  const [faviconError, setFaviconError] = useState(false)
  const { [id]: thisBookmark } = useSelector((state) => state.bookmarks)

  const hasError = () => setFaviconError(true)

  return (
    <div className='row'>
      {faviconError ? (
        <DefaultFavicon />
      ) : (
        <img
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${thisBookmark.url}`}
          alt={`Favicon for ${thisBookmark.url}`}
          onError={hasError}
        />
      )}
      <a href={thisBookmark.url} target='_blank' rel='noreferrer'>
        {thisBookmark.title}
      </a>
    </div>
  )
}

export default Bookmark
