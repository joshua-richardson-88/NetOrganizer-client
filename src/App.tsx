// react
import React, { useEffect } from 'react'

// modules

// project files
import './App.css'
import Header from './components/Header'
import Content from './features/categories'
import { useDispatch, useSelector } from './hooks/useRedux'
import { userSignIn } from './features/auth/thunks'
import { getData } from './features/tabs/thunks'

function App() {
  const dispatch = useDispatch()
  const { uid } = useSelector((state) => state.auth)
  const { order } = useSelector((state) => state.tabs)

  const handleSignIn = () => dispatch(userSignIn())

  useEffect(() => {
    if (uid && order.length === 0) dispatch(getData())
  }, [dispatch, order, uid])

  if (!uid)
    return (
      <div className='login'>
        <h1>NetOrganizer</h1>
        <span>Bookmark management for power users</span>
        <button onClick={handleSignIn}>Sign in with Google</button>
      </div>
    )

  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default App
