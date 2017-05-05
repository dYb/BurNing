import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import thunk from 'redux-thunk'
const token = JSON.parse(localStorage.getItem('token')) || null
const authToken = (token && token.exp * 1000 > Date.now()) ? token : null

export default createStore(
  reducer,
  { authToken },
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
