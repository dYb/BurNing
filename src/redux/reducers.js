import { combineReducers } from 'redux'
import auth from './modules/auth'
import post from './modules/post'
import person from './modules/person'

export default combineReducers({
  auth,
  post,
  person
})
