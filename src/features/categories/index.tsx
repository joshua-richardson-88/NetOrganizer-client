// react
import { FC } from 'react'

// modules
// project files
import './index.css'
import { addCategory } from './thunks'
import Category from './components/Category'
import { useDispatch, useSelector } from '../../hooks/useRedux'

type Props = {}
const Content: FC<Props> = () => {
  const dispatch = useDispatch()
  const { activeTab, list, order } = useSelector((state) => state.tabs)
  const handleAddCategory = () => {
    dispatch(addCategory({ title: 'New Category', tabId: order[activeTab] }))
  }

  if (activeTab < 0) return <BlankPage />

  return (
    <main>
      <div className='category-list'>
        {list[order[activeTab]]?.categories &&
          list[order[activeTab]].categories.map((categoryId, index) => (
            <Category
              key={categoryId}
              id={categoryId}
              tabId={order[activeTab]}
              tabTitle={list[order[activeTab]].title}
            />
          ))}
      </div>
      <button className='fab' onClick={handleAddCategory}>
        +
      </button>
    </main>
  )
}

export default Content

const BlankPage = () => (
  <main>
    <h1 className='blank-category'>Select a Tab to begin</h1>
  </main>
)
