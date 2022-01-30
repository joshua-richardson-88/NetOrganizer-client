// react
import { FC } from 'react'

// modules
// project files

type Props = {}
const Portal: FC<Props> = () => {
  return (
    <div className='modal-overlay'>
      <div className='modal'></div>
    </div>
  )
}

export default Portal
