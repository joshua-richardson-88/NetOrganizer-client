// react
import { FC } from 'react'
import { useSelector } from '../../hooks/useRedux'

// modules

// project files
import Category from './components/Category'

type Props = {}
const Content: FC<Props> = () => {
  const { activeTab, list, order } = useSelector((state) => state.tabs)

  return (
    <main>
      {list[order[activeTab]].categories.map((categoryId) => (
        <Category key={categoryId} id={categoryId} />
      ))}
      <button className='fab'>+</button>
    </main>
  )
}

export default Content
