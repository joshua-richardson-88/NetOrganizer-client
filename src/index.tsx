// react
import React from 'react'

// modules
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// project files
import './index.css'
import App from './App'
import store from './app/store'
import reportWebVitals from './reportWebVitals'

// types

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
