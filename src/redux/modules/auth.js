import axios from 'axios'
import decode from 'jwt-decode'

const LOGIN = 'burning/auth/LOGIN'
const LOGIN_SUCCESS = 'burning/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'burning/auth/LOGIN_FAIL'
const LOGOUT = 'burning/auth/LOGOUT'

const initState = {}
// reducer
export default (state = initState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export function login(person, remember) {
  return dispatch => {
    dispatch({
      type: LOGIN
    })
    return axios.post('/login', { ...person })
      .then((result) => {
        if (!result.data) {
          dispatch({
            type: LOGIN_FAIL,
            error: result.errors
          })
          return Promise.resolve(false)
        }
        const authToken = decode(result.data)
        dispatch({
          type: LOGIN_SUCCESS,
          result: authToken
        })
        if (remember && authToken) {
          localStorage.setItem('token', JSON.stringify(authToken))
        } else {
          document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        }
        return authToken
      })
  }
}
export function logout() {
  localStorage.removeItem('token')
  document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  return {
    type: LOGOUT,
    authToken: null
  }
}
