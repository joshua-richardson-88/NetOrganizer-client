// react
import React, { useEffect } from 'react'

// modules

// project files
import './App.css'
import Header from './features/tabs'
import Content from './features/categories'
import { useDispatch, useSelector } from './hooks/useRedux'
import { userSignIn } from './features/auth/thunks'

function App() {
  const dispatch = useDispatch()
  const { uid } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!uid) {
      dispatch(userSignIn())
      return
    }
  }, [uid, dispatch])

  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default App
