import axios from 'axios'
import decode from 'jwt-decode'

export const ADD_PERSON = 'ADD_PERSON'
export function addPerson(person) {
  return (dispatch) => {
    const mutation = ` 
      mutation {
        addPerson(name: "${person.name}", email: "${person.email}", password: "${person.password}"){
          message
          created
        }
      }
    `
    axios.post('/graphql', { query: mutation })
      .then(result => result.data)
      .then((result) => {
        if (result.errors) {
          return Promise.reject(new Error(result.errors[0].message))
        }
        dispatch({ type: ADD_PERSON, result: result.data.addPerson })
        setTimeout(() => {
          dispatch({ type: ADD_PERSON, result: null })
        }, 2000)
      })
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

function _searchPerson({ id, email, authToken }) {
  const query = ` 
    query PeopleInfo($id: Int, $email: String) {
      people(id: $id, email: $email) {
        id
        name
        email
        posts {
          id
          title
        }
      }
    }
  `
  return axios({
    method: 'post',
    url: '/graphql',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken ? authToken.token : ''}`
    },
    data: {
      query,
      variables: { id, email }
    }
  })
  .then(result => result.data)
  .then((result) => {
    if (result.errors) {
      throw new Error(result.error)
    }
    return result.data.people
  })
}

export const SEARCH_PERSON = 'SEARCH_PERSON'
export function searchPerson({ id, email }) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    _searchPerson({ id, email, authToken })
      .then(people => dispatch({ type: SEARCH_PERSON, people }))
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export function doLogin(person) {
  return (dispatch) => {
    axios.post('/login', { ...person })
    .then((result) => {
      dispatch({
        type: SET_AUTH_TOKEN,
        authToken: Object.assign(decode(result.data), { token: result.data })
      })
    })
    // .catch(err => alert(err))
  }
}

export function doLogout() {
  return {
    type: SET_AUTH_TOKEN,
    authToken: null
  }
}

export const FETCH_PROFILE = 'FETCH_PROFILE'
export function fetchProfile(id) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    _searchPerson({ id, authToken })
      .then(people => dispatch({ type: FETCH_PROFILE, people }))
      .catch(err => {
        // alert(err.message)
      })
  }
}

export const FETCH_POST = 'FETCH_POST'
export function fetchPost({ id, title }) {
  return (dispatch, getState) => {
    const query = `
      query PostsInfo($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          id
          title
          outward
          content
          person {
            id
            name
            email
          }
        }
      }
    `
    const { authToken } = getState()
    return axios({
      method: 'post',
      url: '/graphql',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken ? authToken.token : ''}`
      },
      data: {
        query,
        variables: { id, title }
      }
    })
      .then(result => result.data)
      .then((result) => {
        if (result.errors) {
          throw new Error(result.error)
        }
        return result.data.posts[0]
      })
      .then(post => dispatch({
        type: FETCH_POST,
        post
      }))
  }
}

// function graphqlRequest({ query, variables, operationName }) {
//   axios.post('/graphql', { query: mutation })
//     .then(result => result.data)
// }
