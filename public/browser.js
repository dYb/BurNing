import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// AppContainer is a necessary wrapper component for HMR
import App from 'src/containers/app.jsx'
import configureStore from 'src/store'


// import AnimationExample from './components/test.jsx'
// ReactDOM.render(
//   <AnimationExample />,
//   document.getElementById('root')
// )

const token = JSON.parse(localStorage.getItem('token')) || null
const authToken = (token && token.exp * 1000 > Date.now()) ? token : null
const initialState = Object.assign({ authToken }, window.__PRELOAD__STATE)
const store = configureStore(initialState)

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}
render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('src/containers/app.jsx', () => {
    const NextRootContainer = require('src/containers/app.jsx').default
    render(NextRootContainer)
  })
}
