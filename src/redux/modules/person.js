const { graphQLHelper } = process.env.BROWSER ? require('utils/client-graphql-helper') : require('utils/server-graphql-helper')

const ADD = 'burning/person/ADD'
const DELETE = 'burning/person/DELETE'
const SEARCH = 'burning/person/SEARCH'
const PROFILE = 'burning/person/PROFILE'

const initState = {
  profile: {}
}
export default (state = initState, action = {}) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        addResult: action.result
      }
    case SEARCH:
      return {
        ...state,
        searchResult: action.result
      }
    case DELETE:
      return {
        ...state,
        deleteResult: action.result
      }
    case PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.result.id]: action.result
        }
      }
    default:
      return state
  }
}
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
      .then(data => {
        dispatch({ type: ADD, result: data.addPerson })
        return data.addPerson
      })
  }
}
export function searchPerson(person) {
  return dispatch => {
    const query = `
      query People($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
          name
          email
        }
      }
    `
    return graphQLHelper(query, person)
      .then(data => data.people)
      .then(people => {
        dispatch({ type: SEARCH, result: people })
        return people
      })
  }
}
export function fetchProfile(person) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    const query = `
      query People($id: Int, $email: String) {
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
    return graphQLHelper(query, person, { authToken })
      .then(data => data.people)
      .then(people => {
        dispatch({
          type: PROFILE,
          result: people[0] || person
        })
        return people
      })
  }
}

