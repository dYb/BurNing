import axios from 'axios'
import decode from 'jwt-decode'

import { graphQLHelper } from '../utils'

export const ADD_PERSON = 'ADD_PERSON'
export function addPerson(person) {
  return (dispatch) => {
    const mutation = ` 
      mutation AddPerson($name: String!, $email: String!, $password: String!){
        addPerson(name: $name, email: $email, password: $password){
          message
          created
        }
      }
    `
    graphQLHelper(mutation, person)
      .then((data) => {
        dispatch({ type: ADD_PERSON, result: data.addPerson })
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
  return graphQLHelper(query, { id, email }, authToken)
    .then((data) => {
      return data
    })
    .then(data => data.people)
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
export function doLogin(person, remember) {
  return (dispatch) => {
    return axios.post('/login', { ...person })
    .then((result) => {
      if (!result.data) {
        dispatch({
          type: SET_AUTH_TOKEN,
          authToken: ''
        })
        return Promise.resolve()
      }
      const authToken = Object.assign(decode(result.data), { token: result.data })
      dispatch({
        type: SET_AUTH_TOKEN,
        authToken
      })
      if (remember && authToken) {
        localStorage.setItem('token', JSON.stringify(authToken))
      }
      return result
    })
    // .catch(err => alert(err))
  }
}

export function doLogout() {
  localStorage.removeItem('token')
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
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

export const FETCH_POST = 'FETCH_POST'
export function fetchPost({ id, title }) {
  return (dispatch, getState) => {
    const { authToken } = getState()
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
    return graphQLHelper(query, { id, title }, authToken)
      .then(result => result.posts)
      .then(posts => posts && posts[0] && dispatch({
        type: FETCH_POST,
        post: posts[0]
      }))
  }
}

export const ADD_POST = 'ADD_POST'
export function addPost(post) {
  return (dispatch, getState) => {
    const mutation = `
      mutation AddPost($title: String!, $content: String!, $outward: Boolean) {
        addPost(title: $title, content: $content, outward: $outward) {
          id
          message
        }
      }
    `
    const { authToken } = getState()
    return graphQLHelper(mutation, post, authToken)
      .then(data => dispatch({ type: ADD_POST, result: data.addPost }))
  }
}

export const FETCH_POST_LIST = 'FETCH_POST_LIST'
export function fetchPostList() {
  return (dispatch, getState) => {
    const { authToken } = getState()
    const query = `
      query {
        posts {
          id
          title
        }
      }
    `
    return graphQLHelper(query, null, authToken)
      .then(result => result.posts)
      .then(posts => posts && dispatch({
        type: FETCH_POST_LIST,
        posts
      }))
  }
}
// function graphqlRequest({ query, variables, operationName }) {
//   axios.post('/graphql', { query: mutation })
//     .then(result => result.data)
// }
