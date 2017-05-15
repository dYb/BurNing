import axios from 'axios'
import decode from 'jwt-decode'
const { graphQLHelper } = process.env.BROWSER ? require('./utils/client-graphql-helper') : require('./utils/server-graphql-helper')
console.log(process.env.BROWSER)

export const CREATE_PERSON = 'CREATE_PERSON'
export function addPerson(person) {
  return (dispatch, getState) => {
    const mutation = ` 
      mutation AddPerson($name: String!, $email: String!, $password: String!){
        addPerson(name: $name, email: $email, password: $password){
          message
          created
        }
      }
    `
    const { authToken } = getState()
    return graphQLHelper(mutation, person, { authToken })
      .then((data) => {
        dispatch({ type: CREATE_PERSON, result: data.addPerson })
      })
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

function _searchPerson({ id, email = '' }, authToken = {}) {
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
  return graphQLHelper(query, { id, email }, { authToken })
    .then((data) => {
      return data
    })
    .then(data => data.people)
}

export const SEARCH_PERSON = 'SEARCH_PERSON'
export function searchPerson({ id, email }) {
  return (dispatch) => {
    return _searchPerson({ id, email })
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
          authToken: false
        })
        return Promise.resolve(false)
      }
      const authToken = decode(result.data)
      dispatch({
        type: SET_AUTH_TOKEN,
        authToken
      })
      if (remember && authToken) {
        localStorage.setItem('token', JSON.stringify(authToken))
      } else {
        document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
      return result
    })
  }
}

export function doLogout() {
  localStorage.removeItem('token')
  document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  return {
    type: SET_AUTH_TOKEN,
    authToken: null
  }
}

export const FETCH_PROFILE = 'FETCH_PROFILE'
export function fetchProfile({ id }) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    return _searchPerson({ id: +id }, { authToken })
      .then((people) => {
        const person = (people && people.length) ? people[0] : { id }
        dispatch({
          type: FETCH_PROFILE,
          person
        })
        return person
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
    return graphQLHelper(query, { id, title }, { authToken })
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
    return graphQLHelper(mutation, post)
      .then(data => dispatch({ type: ADD_POST, result: data.addPost }))
  }
}

export const FETCH_POST_LIST = 'FETCH_POST_LIST'
export function fetchPostList() {
  return (dispatch, getState) => {
    const query = `
      query {
        posts {
          id
          title
        }
      }
    `
    const { authToken } = getState()
    return graphQLHelper(query, null, { authToken })
      .then(result => result.posts)
      .then(posts => posts && dispatch({
        type: FETCH_POST_LIST,
        posts
      }))
  }
}
