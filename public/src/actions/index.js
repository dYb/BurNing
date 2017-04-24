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
          throw new Error(result.errors[0].message)
        }
        dispatch({ type: ADD_PERSON, result: result.data.addPerson })
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
      throw new Error(result.errors)
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
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

function _fetchPost({ id, title, authToken }) {
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
      return result.data.posts
    })
}

export const FETCH_POST = 'FETCH_POST'
export function fetchPost({ id, title }) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    _fetchPost({ id, title, authToken })
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
    return axios({
      method: 'post',
      url: '/graphql',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken ? authToken.token : ''}`
      },
      data: {
        query: mutation,
        variables: {...post}
      }
    })
      .then(result => result.data)
      .then((result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message)
        }
        dispatch({ type: ADD_POST, result: result.data.addPost })
      })
  }
}

export const FETCH_POST_LIST = 'FETCH_POST_LIST'
export function fetchPostList() {
  return (dispatch, getState) => {
    const { authToken } = getState()
    _fetchPost({ authToken })
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
