import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppContainer } from 'react-hot-loader'
// AppContainer is a necessary wrapper component for HMR
import App from './containers/app'
import store from './store'

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

store.subscribe(() => {
  render(App)
})

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/app', () => {
    render(App)
  })
}
