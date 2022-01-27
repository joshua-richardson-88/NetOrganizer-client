// react
import { FC, useState } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../hooks/useRedux'
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg'
import { createTab } from './tabSlice'
import Tab from './components/Tab'

// types

type Props = {}
const Header: FC<Props> = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.tabs)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => setEditMode((prevMode) => !prevMode)
  const addTab = () => dispatch(createTab({ tabTitle: 'New Tab' }))

  return (
    <header>
      <div className='tablist'>
        {order.map((id, index) => (
          <Tab key={id} id={id} position={index} inEditMode={editMode} />
        ))}
      </div>
      <button onClick={addTab}>+</button>
      <button onClick={toggleEditMode}>
        <EditIcon />
      </button>
    </header>
  )
}

export default Header
