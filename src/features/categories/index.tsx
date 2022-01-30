// react
import { FC } from 'react'

// modules
// project files
import { useDispatch, useSelector } from '../../hooks/useRedux'
import { createCategory } from './categorySlice'
import Category from './components/Category'

type Props = {}
const Content: FC<Props> = () => {
  const dispatch = useDispatch()
  const { activeTab, list, order } = useSelector((state) => state.tabs)
  const addCategory = () => {
    const newCategory = { newTitle: 'New Category', tabId: order[activeTab] }
    dispatch(createCategory(newCategory))
  }

  return (
    <main>
      <div className='category-list'>
        {list[order[activeTab]].categories.map((categoryId, index) => (
          <Category
            key={categoryId}
            id={categoryId}
            tabTitle={list[order[activeTab]].title}
          />
        ))}
      </div>
      <button className='fab' onClick={addCategory}>
        +
      </button>
    </main>
  )
}

export default Content
