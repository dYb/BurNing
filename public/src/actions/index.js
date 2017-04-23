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
      .catch(err => {
        alert(err.message)
      })
  }
}

export const SEARCH_PERSON = 'SEARCH_PERSON'
export function searchPerson(person) {
  return (dispatch, getState) => {
    const query = ` 
      query PeopleInfo($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
          name
          email
          posts {
            title
            content
          }
        }
      }
    `
    axios({
      method: 'post',
      url: '/graphql',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().token}`
      },
      data: {
        query,
        variables: {...person}
      }
    }).then(result => result.data)
      .then((result) => {
        if (result.errors) {
          return Promise.reject(new Error(result.errors[0].message))
        }
        dispatch({ type: SEARCH_PERSON, person: result.data.people })
      })
      // .catch(err => {
      //   alert(err.message)
      // })
  }
}

export const LOGIN = 'LOGIN'
export function doLogin(person) {
  return (dispatch) => {
    axios.post('/login', { ...person })
    .then((result) => {
      dispatch({ type: LOGIN, authToken: decode(result.data) })
    })
    .catch(err => alert(err))
  }
}

// function graphqlRequest({ query, variables, operationName }) {
//   axios.post('/graphql', { query: mutation })
//     .then(result => result.data)
// }
