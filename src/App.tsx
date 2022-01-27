// react
import React, { useState } from 'react'

// modules

// project files
import './App.css'
import { createTab } from './features/tabs/tabSlice'
import { useSelector, useDispatch } from './hooks/useRedux'
import Header from './features/tabs'

function App() {
  const dispatch = useDispatch()
  const { order, list, activeTab } = useSelector((state) => state.tabs)
  const bookmarks = useSelector((state) => state.bookmarks)
  const categories = useSelector((state) => state.categories)
  const tags = useSelector((state) => state.tags)

  return (
    <>
      <Header />
      <main>
        {list[order[activeTab]].categories.map((categoryId) => (
          <div key={categoryId} className='card'>
            <div className='card-header'>
              <h4 className='card-title'>{categories[categoryId].title}</h4>
            </div>
            <div className='card-body'>
              {categories[categoryId].bookmarks.map((bookmarkId) => (
                <div key={bookmarkId} className='row'>
                  <img
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmarks[bookmarkId].url}`}
                    alt={`Favicon for ${bookmarks[bookmarkId].url}`}
                  />
                  <a
                    href={bookmarks[bookmarkId].url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {bookmarks[bookmarkId].title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default App
