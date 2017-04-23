import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppContainer } from 'react-hot-loader'
// AppContainer is a necessary wrapper component for HMR
import App from './containers/app.jsx'
import store from './store'

// import AnimationExample from './components/test.jsx'
// ReactDOM.render(
//   <AnimationExample />,
//   document.getElementById('root')
// )
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}
render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/app.jsx', () => {
    render(App)
  })
}
