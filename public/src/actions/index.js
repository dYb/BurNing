import axios from 'axios'

export const CHANGE_TAB = 'CHANGE_TAB'
export function changeTab(active) {
  return {
    type: CHANGE_TAB,
    active
  }
}

export const ADD_PERSON = 'ADD_PERSON'
export function addPerson(person) {
  return (dispatch) => {
    const mutation = ` 
      mutation {
        addPerson(name: "${person.name}", email: "${person.email}") {
          id
          name
          email
        }
      }
    `
    axios.post('/graphql', { query : mutation })
      .then(result => result.data)
      .then((result) => {
        if (result.errors) {
          return Promise.reject(new Error(result.errors[0].message))
        }
        dispatch({ type : ADD_PERSON, person : result.data.addPerson })
      })
      .catch(err => {
        alert(err.message)
      })
  }
}


function graphqlRequest(data) {
  axios.post('/graphql', { query : mutation })
    .then(result => result.data)
}